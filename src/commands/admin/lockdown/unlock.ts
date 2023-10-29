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
  name: "unlock",
  command: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription(
      "Unlocks the current channel, making it read and write for the @everyone role, as it is by default.",
    )
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
      ).permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: null,
      });

      await interaction.reply({
        content: `Channel unlocked successfully`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
