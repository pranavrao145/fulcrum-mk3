import translate from "@iamtraction/google-translate";
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
  name: "translate",
  command: new SlashCommandBuilder()
    .setName("translate")
    .setDescription(
      "Translates the given phrase into the given language. The language the phrase is in is auto-detected."
    )
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("language")
        .setDescription(
          "The two letter code (e.g. es or fr) of the language to which to translate"
        )
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("phrase")
        .setDescription("The phrase to translate into the given language")
        .setRequired(true);

      return option;
    }),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const language = interaction.options.getString("language")!;
    const phrase = interaction.options.getString("phrase")!;

    const resultEmbed = new EmbedBuilder()
      .setColor("#ffffff")
      .setTitle("Translation");

    try {
      const translation = await translate(phrase, { to: language });

      resultEmbed.addFields({
        name: `Translation to ${language}`,
        value: translation.text,
      });

      await interaction.reply({
        embeds: [resultEmbed],
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
