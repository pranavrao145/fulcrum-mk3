import {
  CacheType,
  Interaction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export interface ICommand {
  name: string;
  command:|Omit<SlashCommandBuilder, "addSubcommand"|"addSubcommandGroup">|
      SlashCommandSubcommandsOnlyBuilder;
  execute(interaction: Interaction<CacheType>): any;
}


