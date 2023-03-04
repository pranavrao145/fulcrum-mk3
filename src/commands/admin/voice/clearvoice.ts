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
  name: "clearvoice",
  command: new SlashCommandBuilder()
    .setName("clearvoice")
    .setDescription(
      "Clears the given voice-based channel (i.e. kicks everyone out of the channel)."
    )
    .addChannelOption((option: SlashCommandChannelOption) => {
      option
        .setName("channel")
        .setDescription("The voice-based channel to clear")
        .setRequired(true);

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const channelId = interaction.options.getChannel("channel")!.id;
    const channelResolved = interaction.guild.channels.resolve(channelId)!;

    try {
      if (!channelResolved.isVoiceBased()) {
        throw Error("Cannot clear non-voice-based channels.");
      }

      for (const member of channelResolved.members.values()) {
        await member.voice.setChannel(null);
      }

      await interaction.reply({
        content: `Channel ${channelResolved.name} cleared successfully`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
