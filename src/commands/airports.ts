import { type Context, type NarrowedContext } from "telegraf";
import { Update, type Message } from "telegraf/typings/core/types/typegram";
import airportList from "../data/airports";

const airports = async (
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >
) => {
  const lines = 30;
  let currentLine = 0;
  let airpotsToPrint = [];
  for (const airport of airportList) {
    if (currentLine !== lines) {
      airpotsToPrint.push(
        `<strong>${airport.code}</strong> | ${airport.name} | ${airport.city}`
      );
      currentLine++;
    } else {
      await ctx.replyWithHTML(airpotsToPrint.join("\n"));
      currentLine = 0;
      airpotsToPrint = [];
    }
  }
};

export default airports;
