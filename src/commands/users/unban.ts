import assert from "assert";
import {
  CacheType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";
import { handleError } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "unban",
  command: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unbans the given user from the server.")
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("user")
        .setDescription("The ID of the user to unban")
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("reason")
        .setDescription("The reason for to unban")
        .setMaxLength(512);
      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const userId = interaction.options.getString("user")!;
    const reason =
      interaction.options.getString("reason") ?? "No reason provided.";

    try {
      const user = await interaction.guild.members.unban(userId, reason);

      if (user) {
        await interaction.reply({
          content: `User ${user.tag} successfully unbanned for reason: ${reason}`,
          ephemeral: true,
        });
      } else {
        throw Error("Could not find user to unban by ID provided.");
      }
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
