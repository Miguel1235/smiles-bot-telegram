import { DateTime, Interval } from "luxon";
import millify from "millify";
import { months } from "../data/months";
import regions from "../data/regions";

export const convert2ArsStyle = (money: number) => {
  return millify(money, {
    precision: 2,
    locales: "es-AR",
  });
};

export const daysFromInput = (date: string, days: number) => {
  const monthYear = DateTime.fromFormat(date, "M/yyyy");
  const fullDate = DateTime.fromFormat(date, "d/M/yyyy");
  const onlyMonth = DateTime.fromFormat(
    `${months[date]}/${DateTime.now().year}`,
    "M/yyyy"
  );

  if (monthYear.isValid)
    return Interval.fromDateTimes(
      monthYear.startOf("month"),
      monthYear.plus({ days })
    )
      .splitBy({ day: 1 })
      .map((d) => d.start?.toFormat("yyyy-MM-dd"));

  if (onlyMonth.isValid) {
    const currentDate = DateTime.now();
    if (currentDate > onlyMonth)
      return Interval.fromDateTimes(
        onlyMonth.plus({ year: 1 }).startOf("month"),
        onlyMonth.plus({ year: 1, days })
      )
        .splitBy({ day: 1 })
        .map((d) => d.start?.toFormat("yyyy-MM-dd"));
    return Interval.fromDateTimes(
      onlyMonth.startOf("month"),
      onlyMonth.plus({ days })
    )
      .splitBy({ day: 1 })
      .map((d) => d.start?.toFormat("yyyy-MM-dd"));
  }

  return Interval.fromDateTimes(
    fullDate.startOf("day"),
    fullDate.plus({ days })
  )
    .splitBy({ day: 1 })
    .map((d) => d.start?.toFormat("yyyy-MM-dd"));
};

export const translateDestinations = (input: string): string[] => {
  const destinations: string[] = [];
  for (const destination of input.split(",")) {
    if (regions[destination.toUpperCase()]) {
      destinations.push(...regions[destination].split(","));
    } else {
      destinations.push(destination);
    }
  }
  return destinations;
};

export const mapClass = (clase: string): string => {
  switch (clase.toUpperCase()) {
    case "EJE":
      return "business";
    case "ECO":
      return "economic";
    default:
      return "all";
  }
};
