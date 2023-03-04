import assert from "assert";
import {
  CacheType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandChannelOption,
  SlashCommandUserOption,
} from "discord.js";
import { handleError } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "movemember",
  command: new SlashCommandBuilder()
    .setName("movemember")
    .setDescription(
      "Moves the given member from the voice-based channel they are in to the given voice-based channel."
    )
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member")
        .setDescription("The member to move")
        .setRequired(true);

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option
        .setName("channel")
        .setDescription(
          "The voice-based channel to which the given member should be moved"
        )
        .setRequired(true);

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const memberId = interaction.options.getUser("member")!.id;
    const memberResolved = interaction.guild.members.resolve(memberId)!;

    const channelId = interaction.options.getChannel("channel")!.id;
    const channelResolved = interaction.guild.channels.resolve(channelId);

    try {
      if (!channelResolved!.isVoiceBased()) {
        throw Error("Cannot clear non-voice-based channels.");
      }

      await memberResolved.voice.setChannel(channelResolved);

      await interaction.reply({
        content: `Member ${memberResolved.user.tag} moved to ${channelResolved.name} successfully`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
