import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";

export interface ICommand {
  name: string;
  command: SlashCommandBuilder;
  execute(interaction: Interaction<CacheType>): any;
}
