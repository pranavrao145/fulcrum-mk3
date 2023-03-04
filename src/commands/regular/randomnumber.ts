import assert from "assert";
import axios from "axios";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
} from "discord.js";

import { getRandomInteger, handleError } from "../../utils/helpers";
import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "randomnumber",
  command: new SlashCommandBuilder()
    .setName("randomnumber")
    .setDescription(
      "Provide a random number within the given range (inclusive)."
    )
    .addIntegerOption((option: SlashCommandIntegerOption) => {
      option
        .setName("start")
        .setDescription("The start of the range to consider (inclusive)")
        .setRequired(true);

      return option;
    })
    .addIntegerOption((option: SlashCommandIntegerOption) => {
      option
        .setName("end")
        .setDescription("The end of the range to consider (inclusive)")
        .setRequired(true);

      return option;
    }),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const start = interaction.options.getInteger("start")!;
    const end = interaction.options.getInteger("end")!;

    try {
      const randomNumber = getRandomInteger(start, end);
      await interaction.reply(`Your random number is: ${randomNumber}`);
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
