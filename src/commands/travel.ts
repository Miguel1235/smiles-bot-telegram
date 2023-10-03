import { type Context, type NarrowedContext } from "telegraf";
import { Update, type Message } from "telegraf/typings/core/types/typegram";
import { type FlightList } from "../models/flights";
import {
  daysFromInput,
  mapClass,
  translateDestinations,
} from "../utils/convertors";
import { type TravelInput } from "../models/input";
import parseInput from "../utils/parsers";
import {
  filterFlights,
  groupFlights,
  obtainFlights,
  obtainTaxes,
  printFlights,
  sortFlights,
} from "../utils/flights";
import { type TaxesMap } from "../models/taxes";
import { FINDER_TEXT, INVALID_INPUT } from "../docs/helpDocs";

const travel = async (
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >
) => {
  const parsedInput = parseInput(["", ...ctx.message.text.split(" ")]);

  if (!parsedInput) return await ctx.reply(INVALID_INPUT);

  const {
    ida,
    tasas,
    agrupar,
    scanDays,
    origen,
    destino,
    adultos,
    niños,
    bebes,
    clase,
    ppm,
    duracionMax,
    escalasMax,
    asientosMin,
    awards,
  } = parsedInput as TravelInput;

  await ctx.reply(FINDER_TEXT);

  // Obtain flights
  let flightsList: FlightList[] = await obtainFlights(
    daysFromInput(ida, scanDays),
    translateDestinations(origen),
    translateDestinations(destino),
    adultos,
    niños,
    bebes,
    mapClass(clase)
  );

  // Filter and sort flights
  flightsList = filterFlights(
    flightsList,
    duracionMax,
    escalasMax,
    asientosMin,
    awards,
    mapClass(clase)
  );
  flightsList = groupFlights(agrupar, flightsList);

  // calculate taxes
  const taxesMap: TaxesMap = await obtainTaxes(tasas, flightsList);

  await printFlights(
    ctx,
    sortFlights(flightsList),
    taxesMap,
    adultos,
    bebes,
    niños,
    ppm
  );
};

export default travel;
