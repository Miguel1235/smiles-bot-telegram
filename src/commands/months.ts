import { type Context, type NarrowedContext } from "telegraf";
import { Update, type Message } from "telegraf/typings/core/types/typegram";
import { months as monthsList } from "../data/months";

const months = async (
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >
) => {
  const months2Print = [];
  for (const [short, long] of Object.entries(monthsList))
    months2Print.push(`<strong>${short}</strong> | ${long}`);
  await ctx.replyWithHTML(months2Print.join("\n"));
};

export default months;
