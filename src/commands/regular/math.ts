import assert from "assert";
import axios from "axios";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";
import { Parser } from "expr-eval";

import { handleError } from "../../utils/helpers";
import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "math",
  command: new SlashCommandBuilder()
    .setName("math")
    .setDescription("Evaluates the mathematical expression given.")
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("expression")
        .setDescription("The mathematical expression to evaluate.")
        .setRequired(true);

      return option;
    }),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const mathExpression = interaction.options.getString("expression")!;

    const resultEmbed = new EmbedBuilder().setColor("#ffffff").setTitle("Math");
    try {
      resultEmbed.addFields([
        { name: "Result", value: Parser.evaluate(mathExpression).toString() },
      ]);

      await interaction.reply({
        embeds: [resultEmbed],
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
