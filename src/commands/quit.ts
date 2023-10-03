import { type Context, type NarrowedContext } from "telegraf";
import {
  type Message,
  type Update,
} from "telegraf/typings/core/types/typegram";

const quit = async (
  ctx: NarrowedContext<
    Context<Update>,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage;
      update_id: number;
    }
  >
) => {
  await ctx.telegram.leaveChat(ctx.message.chat.id);
  await ctx.leaveChat();
};

export default quit;
