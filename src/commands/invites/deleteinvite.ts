import assert from "assert";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  PermissionFlagsBits,
  InviteResolvable,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";

import { handleError } from "../../utils/helpers";
import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "deleteinvites",
  command: new SlashCommandBuilder()
    .setName("deleteinvites")
    .setDescription("Deletes the given invite(s).")
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("invite1")
        .setDescription("A code of an invite to be deleted")
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("invite2")
        .setDescription("A code of an invite to be deleted");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("invite3")
        .setDescription("A code of an invite to be deleted");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("invite4")
        .setDescription("A code of an invite to be deleted");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("invite5")
        .setDescription("A code of an invite to be deleted");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("invite6")
        .setDescription("A code of an invite to be deleted");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("invite7")
        .setDescription("A code of an invite to be deleted");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("invite8")
        .setDescription("A code of an invite to be deleted");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("invite9")
        .setDescription("A code of an invite to be deleted");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("invite10")
        .setDescription("A code of an invite to be deleted");

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const invites: Array<InviteResolvable> = [];

    for (let index = 1; index < 11; index++) {
      const inviteCode = interaction.options.getString("invite" + index);

      if (inviteCode) {
        invites.push(inviteCode);
      }
    }

    let reportText = "";

    for (const inviteId of invites) {
      try {
        await interaction.guild.invites.delete(inviteId);

        reportText += `${inviteId}: Success\n`;
      } catch (e: any) {
        reportText += `${inviteId}: Failure\n`;
      }
    }

    const resultEmbed = new EmbedBuilder()
      .setColor("#ffffff")
      .setTitle("Delete Invites - Report")
      .setDescription(`Report of attempt to delete the given invite(s).`)
      .addFields({ name: "Invites Deleted", value: reportText });

    try {
      await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
