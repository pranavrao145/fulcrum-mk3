import assert from "assert";
import {
  CacheType,
  Interaction,
  NewsChannel,
  PermissionFlagsBits,
  SlashCommandBuilder,
  StageChannel,
  TextChannel,
  VoiceChannel,
} from "discord.js";

import { handleError } from "../../../utils/helpers";
import { ICommand } from "../../../utils/types";

const command: ICommand = {
  name: "lock",
  command: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Locks the current channel, making it read-only.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    try {
      (
        interaction.channel as
          | NewsChannel
          | StageChannel
          | TextChannel
          | VoiceChannel
      ).permissionOverwrites.create(interaction.guild.roles.everyone, {
        SendMessages: false,
      });

      await interaction.reply({
        content: `Channel locked successfully`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
