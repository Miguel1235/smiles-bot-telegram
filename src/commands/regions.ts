import { type Context, type NarrowedContext } from "telegraf";
import { Update, type Message } from "telegraf/typings/core/types/typegram";
import {REGIONS_TEXT} from "../docs/helpDocs";

const regions = async (
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >
) => {
  await ctx.reply(REGIONS_TEXT)
};

export default regions;
