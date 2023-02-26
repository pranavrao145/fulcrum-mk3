import assert from "assert";
import {
  CacheType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandStringOption,
  SlashCommandUserOption,
} from "discord.js";
import { handleError } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "kick",
  command: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the given member from the server.")
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member")
        .setDescription("The member to kick")
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("reason")
        .setDescription("The reason for the kick")
        .setMaxLength(512);
      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const member = interaction.options.getUser("member")!;
    const reason =
      interaction.options.getString("reason") ?? "No reason provided.";

    try {
      await interaction.guild.members.kick(member, reason);

      await interaction.reply({
        content: `User ${member.tag} successfully kicked for reason: ${reason}`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
