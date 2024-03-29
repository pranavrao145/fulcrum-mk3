import assert from "assert";
import {
  CacheType,
  Interaction,
  NewsChannel,
  PermissionFlagsBits,
  PrivateThreadChannel,
  PublicThreadChannel,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  TextChannel,
  VoiceChannel,
} from "discord.js";

import { handleError } from "../../../utils/helpers";
import { ICommand } from "../../../utils/types";

const command: ICommand = {
  name: "purgechat",
  command: new SlashCommandBuilder()
    .setName("purgechat")
    .setDescription(
      "Purges the given number of recent messages (must be <14 days old) from the current text channel.",
    )
    .addIntegerOption((option: SlashCommandIntegerOption) => {
      option
        .setName("messages")
        .setDescription(
          "Number of messages to delete, must be between 2 and 100, inclusive",
        )
        .setMinValue(2)
        .setMaxValue(100)
        .setRequired(true);

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const numMessages = interaction.options.getInteger("messages")!;

    try {
      await (
        interaction.channel as
          | NewsChannel
          | TextChannel
          | PrivateThreadChannel
          | PublicThreadChannel
          | VoiceChannel
      ).bulkDelete(numMessages);

      await interaction.reply({
        content: `Successfully deleted ${numMessages} most recent messages in the current channel`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};
export = command;
