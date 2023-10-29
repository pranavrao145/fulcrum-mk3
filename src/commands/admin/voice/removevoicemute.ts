import assert from "assert";
import {
  CacheType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandChannelOption,
} from "discord.js";
import { handleError } from "../../../utils/helpers";

import { ICommand } from "../../../utils/types";

const command: ICommand = {
  name: "removevoicemute",
  command: new SlashCommandBuilder()
    .setName("removevoicemute")
    .setDescription(
      "Removes mutes from all members in the given voice-based channel.",
    )
    .addChannelOption((option: SlashCommandChannelOption) => {
      option
        .setName("channel")
        .setDescription("The voice-based channel from which to remove the mute")
        .setRequired(true);

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const channelId = interaction.options.getChannel("channel")!.id;
    const channelResolved = interaction.guild.channels.resolve(channelId)!;

    try {
      if (!channelResolved.isVoiceBased()) {
        throw Error("Cannot remove mute from non-voice-based channels.");
      }

      for (const member of channelResolved.members.values()) {
        await member.voice.setMute(false);
      }

      await interaction.reply({
        content: `Successfully removed mute from ${channelResolved.name}`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
