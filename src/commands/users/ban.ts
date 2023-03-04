import assert from "assert";
import {
  CacheType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandStringOption,
  SlashCommandUserOption,
} from "discord.js";
import { handleError } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "ban",
  command: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans the given member from the server.")
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member")
        .setDescription("The member to ban")
        .setRequired(true);

      return option;
    })
    .addIntegerOption((option: SlashCommandIntegerOption) => {
      option
        .setName("seconds")
        .setDescription(
          "Number of seconds of messages to delete, between 0 and 604800 (7 days), inclusive (default 0)"
        )
        .setMinValue(0)
        .setMaxValue(604800);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("reason")
        .setDescription("The reason for the ban (default none)")
        .setMaxLength(512);
      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const member = interaction.options.getUser("member")!;
    const deleteMessageSeconds =
      interaction.options.getInteger("seconds") ?? 0;
    const reason =
      interaction.options.getString("reason") ?? "No reason provided.";

    try {
      await interaction.guild.members.ban(member, {
        reason: reason,
        deleteMessageSeconds: deleteMessageSeconds,
      });

      await interaction.reply({
        content: `Member ${member.tag} successfully banned for reason: ${reason}`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
