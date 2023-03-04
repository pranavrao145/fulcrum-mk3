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
  name: "movevoice",
  command: new SlashCommandBuilder()
    .setName("movevoice")
    .setDescription(
      "Moves all members from the first given voice-based channel to the second."
    )
    .addChannelOption((option: SlashCommandChannelOption) => {
      option
        .setName("from")
        .setDescription("The voice-based channel from which to move members")
        .setRequired(true);

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option
        .setName("channel")
        .setDescription(
          "The voice-based channel to which members should be moved"
        )
        .setRequired(true);

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const fromId = interaction.options.getChannel("from")!.id;
    const fromResolved = interaction.guild.channels.resolve(fromId)!;

    const toId = interaction.options.getChannel("channel")!.id;
    const toResolved = interaction.guild.channels.resolve(toId)!;

    try {
      if (!(fromResolved.isVoiceBased() && toResolved.isVoiceBased())) {
        throw Error("Cannot move members to or from non-voice-based channels.");
      }

      for (const member of fromResolved.members.values()) {
        await member.voice.setChannel(toResolved);
      }

      await interaction.reply({
        content: `Members from channel ${fromResolved.name} moved to ${toResolved.name} successfully`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
