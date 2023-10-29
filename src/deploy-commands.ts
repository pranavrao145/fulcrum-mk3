import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import glob from "glob";
import { promisify } from "util";
import { ICommand } from "./utils/types";

const deployCommands = async () => {
  const globPromise = promisify(glob);
  const commands: Array<RESTPostAPIChatInputApplicationCommandsJSONBody> = [];

  const commandFiles = await globPromise(`${__dirname}/commands/**/*.{js,ts}`); // identify command files

  for (const file of commandFiles) {
    const command: ICommand = await import(file);
    commands.push(command.command.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(
    process.env.FULCRUM_BOT_TOKEN!,
  );

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    const data: any = await rest.put(
      Routes.applicationCommands(process.env.FULCRUM_CLIENT_ID!),
      { body: commands },
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    console.error(error);
  }
};

export default deployCommands;
