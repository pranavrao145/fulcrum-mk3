// set env
import * as dotenv from "dotenv";

dotenv.config();

import Discord, { Collection } from "discord.js";
import { ICommand } from "./utils/types";
import { promisify } from "util";
import glob from "glob";
import deployCommands from "./deploy-commands";
import { handleError } from "./utils/helpers";

const client: Discord.Client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});

// BOT PREP

// prepare to read command files
const globPromise = promisify(glob);
const commands: Collection<string, ICommand> = new Collection();

// load in command files
(async () => {
  const commandFiles = await globPromise(`${__dirname}/commands/**/*.{js,ts}`); // identify command files

  for (const file of commandFiles) {
    const command: ICommand = await import(file);
    commands.set(command.name, command);
    console.log(`Command ${command.name} loaded successfully.`);
  }
})();

// EVENT HANDLERS

client.on(Discord.Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user!.tag}!`);
  console.log(`Currently in ${client.guilds.cache.size} guilds!`);

  try {
    client.user!.setPresence({
      status: "online",
      activities: [
        {
          name: "f!help", // TODO: is is really though
          type: Discord.ActivityType.Watching,
        },
      ],
    });
  } catch (e: any) {
    console.error(e);
  }

  deployCommands();
});

client.on(Discord.Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (command) {
    try {
      await command.execute(interaction);
    } catch (e: any) {
      handleError(interaction, e);
    }
  }
});

(async () => {
  try {
    client.login(process.env.FULCRUM_BOT_TOKEN);
  } catch (e: any) {
    throw e;
  }
})();
