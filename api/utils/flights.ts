import {
  type FlightList,
  type Flights,
  type FlightsByDay,
} from "../models/flights";
import { DateTime } from "luxon";
import { type Taxes, type TaxesMap } from "../models/taxes";
import { convert2ArsStyle } from "./convertors";
import flights from "../api/flights";
import taxesApi from "../api/taxes";
import { type Context, type NarrowedContext } from "telegraf";
import { Update, type Message } from "telegraf/typings/core/types/typegram";
import { emojis } from "../emojis/emojis";
import { FLIGHTS_NOT_FOUND } from "../docs/helpDocs";

export const groupFlights = (agrupar: boolean, flightsList: FlightList[]) => {
  if (!agrupar) return flightsList;
  const cheapestByDay: FlightsByDay = {};
  for (const flight of flightsList) {
    const milles = flight.fareList[1].miles;
    const date = DateTime.fromISO(
      new Date(flight.departure.date).toISOString()
    ).toFormat("dd-MM-yyyy");
    if (!cheapestByDay[date]) {
      cheapestByDay[date] = flight;
      continue;
    }
    if (cheapestByDay[date].fareList[1].miles > milles)
      cheapestByDay[date] = flight;
  }
  return Object.values(cheapestByDay);
};

export const filterFlights = (
  flightsList: FlightList[],
  duracionMax: number,
  escalasMax: number,
  asientosMin: number,
  awards: boolean,
  clase: string
) => {
  const flights: FlightList[] = [...flightsList]
    .filter((flight) => flight.duration.hours < duracionMax)
    .filter((flight) => flight.stops < escalasMax)
    .filter((flight) => flight.availableSeats >= asientosMin)
    .filter((flight) => flight.sourceFare === "AWARD")
    .filter(
      (flight) =>
        clase.toUpperCase() === "ALL" ?? flight.cabin === clase.toUpperCase()
    );
  return flights;
};

export const printFlight = (
  flight: FlightList,
  taxesMap: TaxesMap,
  adults: number,
  infants: number,
  childrens: number,
  ppm: number
) => {
  const urlValue = `https://www.smiles.com.ar/emission?originAirportCode=${
    flight.departure.airport.code
  }&destinationAirportCode=${
    flight.arrival.airport.code
  }&departureDate=${DateTime.fromISO(
    new Date(flight.departure.date).toISOString()
  ).toMillis()}&adults=${adults}&infants=${infants}&children=${childrens}&cabinType=all&tripType=2`;
  const urlName = `${flight.departure.airport.code}-${
    flight.arrival.airport.code
  } ${DateTime.fromISO(new Date(flight.departure.date).toISOString()).toFormat(
    "dd/MM"
  )} ${flight.airline.code}`;
  const miles = flight.fareList[1].miles;
  const availableSeats = flight.availableSeats;
  const duration = flight.duration.hours;
  const stops = flight.stops;

  if (!taxesMap[flight.uid])
    return `<a href="${urlValue}">${urlName}</a> | <strong>${convert2ArsStyle(
      miles
    )}${emojis.MILES} | </strong> ${availableSeats}${
      emojis.SEATS
    } | ${duration}${emojis.DURATION} | ${stops}${emojis.STOPS}`;

  const money = taxesMap[flight.uid].totals.total.money;
  const total = miles * ppm + money;
  return `<a href="${urlValue}">${urlName}</a> | <strong>${convert2ArsStyle(
    miles
  )}${emojis.MILES}+${convert2ArsStyle(money)}${
    emojis.MONEY
  }=${convert2ArsStyle(total)}${
    emojis.MONEY_BAG
  } | </strong> ${availableSeats}${emojis.SEATS} | ${duration}${
    emojis.DURATION
  } | ${stops}${emojis.STOPS}`;
};

export const printFlights = async (
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >,
  flightsList: FlightList[],
  taxesMap: TaxesMap,
  adultos: number,
  bebes: number,
  niños: number,
  ppm: number
) => {
  const lines = 30;
  let currentLine = 0;
  let flightsToPrint = [];
  if (flightsList.length === 0) await ctx.reply(FLIGHTS_NOT_FOUND);
  for (const flight of flightsList) {
    if (currentLine !== lines) {
      flightsToPrint.push(
        printFlight(flight, taxesMap, adultos, bebes, niños, ppm)
      );
      currentLine++;
    } else {
      await ctx.replyWithHTML(flightsToPrint.join("\n"));
      currentLine = 0;
      flightsToPrint = [];
    }
  }
  if (flightsToPrint.length > 0)
    await ctx.replyWithHTML(flightsToPrint.join("\n"));
};

export const obtainFlights = async (
  days: Array<string | "Invalid DateTime" | undefined>,
  origins: string[],
  destinations: string[],
  adultos: number,
  niños: number,
  bebes: number,
  clase: string
): Promise<FlightList[]> => {
  const flightsPromises = [];
  for (const day of days) {
    for (const origen of origins) {
      for (const destino of destinations) {
        flightsPromises.push(
          flights.get<Flights>("/search", {
            params: {
              adults: adultos,
              children: niños,
              infants: bebes,
              departureDate: day, // returnDate: values.vuelta, // solo para los vuelso de ida y vuelta
              originAirportCode: origen.toUpperCase(),
              destinationAirportCode: destino.toUpperCase(),
              cabinType: clase,
              currencyCode: "ARS",
              isFlexibleDateChecked: false,
              tripType: 2, // 1: ida y vuelta. 2: ida
              forceCongener: false,
              r: "ar",
            },
          })
        );
      }
    }
  }

  const flightsList: FlightList[] = [];

  for (const promise of await Promise.allSettled(flightsPromises)) {
    if (promise.status === "fulfilled") {
      flightsList.push(
        ...promise.value.data.requestedFlightSegmentList[0].flightList
      );
    }
  }
  return flightsList;
};

export const obtainTaxes = async (
  tasas: boolean,
  flightsList: FlightList[]
): Promise<TaxesMap> => {
  const taxesMap: TaxesMap = {};
  if (tasas) {
    const taxesPromises = [];
    for (const flight of flightsList) {
      taxesPromises.push(
        taxesApi.get<Taxes>("/boardingtax", {
          params: {
            adults: 1,
            children: 0,
            infants: 0,
            fareuid: flight.fareList[1].uid,
            uid: flight.uid,
            type: "SEGMENT_1",
            highlightText: "SMILES_CLUB",
          },
        })
      );
    }

    for (const promise of await Promise.allSettled(taxesPromises)) {
      if (promise.status === "fulfilled") {
        const taxes: Taxes = promise.value.data;
        taxesMap[taxes.uid] = taxes;
      }
    }
  }
  return taxesMap;
};

export const sortFlights = (flightList: FlightList[]): FlightList[] => {
  flightList.sort(
    (flight1, flight2) => flight1.fareList[1].miles - flight2.fareList[1].miles
  );
  return flightList;
};
