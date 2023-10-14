import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import { Application, Router } from "@cfworker/web";
import createTelegrafMiddleware from "cfworker-middleware-telegraf";

import quit from "./commands/quit";
import travel from "./commands/travel";
import airports from "./commands/airports";
import airlines from "./commands/airlines";
import months from "./commands/months";
import regions from "./commands/regions";
import { HELPER_TEXT } from "./docs/helpDocs";
import surprise from "./commands/surprise";

declare global {
  interface Window {
    BOT_TOKEN: any;
    API_TOKEN: any;
    SECRET_PATH: any;
  }
}


// const { BOT_TOKEN: token } = process.env;
const token = self.BOT_TOKEN;
if (token == null) throw new Error('"BOT_TOKEN" env var is required!');

const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply(HELPER_TEXT);
});

bot.telegram.setMyCommands([
  { command: "start", description: "Pantalla de ayuda del bot" },
  {
    command: "sorprendeme",
    description:
      "Deja que el bot busque un vuelvo aleatorio a cualquier parte del mundo para vos",
  },
  { command: "aeropuertos", description: "Listado de aeropuertos" },
  { command: "aerolineas", description: "Listado aerolineas" },
  { command: "meses", description: "Obtener el nombre de los meses" },
  {
    command: "regiones",
    description: "Obtener las regiones disponibles para hacer búsquedas",
  },
]);

// Commands are the ones that start with
bot.command("quit", quit);
bot.command("aeropuertos", airports);
bot.command("aerolineas", airlines);
bot.command("meses", months);
bot.command("regiones", regions);
bot.command("sorprendeme", surprise);

bot.on(message("text"), async (ctx) => {
  await travel(ctx);
});

// Error handling middleware
bot.catch((err, ctx) => {
  console.log(err);
  ctx.reply("Hubo un error, intentalo mas tarde");
});

// start the bot
// bot.launch();

const router = new Router();

// const { SECRET_PATH: path } = process.env;
const path = self.SECRET_PATH;
if (path == null) throw new Error('"SECRET_PATH" env var is required!');

router.post(`/${path}`, createTelegrafMiddleware(bot));
new Application().use(router.middleware).listen();


// Enable graceful stop
process.once("SIGINT", () => {
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
});
