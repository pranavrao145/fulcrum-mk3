import assert from "assert";
import axios from "axios";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";

import { handleError } from "../../utils/helpers";
import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "define",
  command: new SlashCommandBuilder()
    .setName("define")
    .setDescription("Defines the given English word.")
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("word")
        .setDescription("The English word to define.")
        .setRequired(true);

      return option;
    }),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const word = interaction.options.getString("word")!;

    const resultEmbed = new EmbedBuilder()
      .setColor("#ffffff")
      .setTitle("Definitions");

    try {
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`,
        );

        const meanings = response.data[0]["meanings"];

        for (const meaning of meanings) {
          const partOfSpeech = meaning["partOfSpeech"];
          const definition = meaning["definitions"][0]["definition"];

          const partOfSpeechFormatted =
            partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1);
          resultEmbed.addFields({
            name: partOfSpeechFormatted,
            value: definition,
          });
        }
      } catch (e: any) {
        resultEmbed.addFields({
          name: "\u200B",
          value: "No definitions found.",
        });
      }

      await interaction.reply({
        embeds: [resultEmbed],
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
