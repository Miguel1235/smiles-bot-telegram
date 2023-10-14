import { type Context, type NarrowedContext } from "telegraf";
import { Update, type Message } from "telegraf/typings/core/types/typegram";
import airlinesList from "../data/airlines";

const airlines = async (
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >
) => {
  const msg = airlinesList
    .map((airline) => `<strong>${airline.code}</strong> | ${airline.name}`)
    .join("\n");

  await ctx.replyWithHTML(msg);
};

export default airlines;
