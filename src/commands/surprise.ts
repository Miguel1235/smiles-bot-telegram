import { type Context, type NarrowedContext } from "telegraf";
import { Update, type Message } from "telegraf/typings/core/types/typegram";
import { months } from "../data/months";
import { type FlightList } from "../models/flights";
import { daysFromInput, translateDestinations } from "../utils/convertors";
import {
  groupFlights,
  obtainFlights,
  obtainTaxes,
  printFlights,
  sortFlights,
} from "../utils/flights";
import { type TaxesMap } from "../models/taxes";
import regions from "../data/regions";
import { FINDER_TEXT } from "../docs/helpDocs";

const surprise = async (
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >
) => {
  try {
    await ctx.reply(FINDER_TEXT);

    let flightsList: FlightList[] = await obtainFlights(
      daysFromInput(
        Object.keys(months)[
          Math.floor(Math.random() * Object.keys(months).length)
        ],
        5
      ),
      ["EZE"],
      translateDestinations(
        Object.keys(regions)[
          Math.floor(Math.random() * Object.keys(regions).length)
        ]
      ),
      1,
      0,
      0,
      "all"
    );

    const taxesMap: TaxesMap = await obtainTaxes(true, flightsList);

    // Filter and sort flights
    flightsList = groupFlights(true, flightsList);
    await printFlights(ctx, sortFlights(flightsList), taxesMap, 1, 0, 0, 2.24);
  } catch (err) {
    console.log(err);
  }
};

export default surprise;
