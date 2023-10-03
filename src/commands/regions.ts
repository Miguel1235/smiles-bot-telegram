import { type Context, type NarrowedContext } from "telegraf";
import { Update, type Message } from "telegraf/typings/core/types/typegram";
import regionsList from "../data/regions";

const regions = async (
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >
) => {
  const regions2Print = [];
  for (const [short, long] of Object.entries(regionsList))
    regions2Print.push(`${short}: ${long}`);
  await ctx.replyWithHTML(regions2Print.join("\n"));
};

export default regions;
