import assert from "assert";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandUserOption,
  User,
} from "discord.js";

import { handleError } from "../../utils/helpers";
import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "kickmultiple",
  command: new SlashCommandBuilder()
    .setName("kickmultiple")
    .setDescription("Kicks up to 10 given users from the server.")
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member1")
        .setDescription("A member to kick")
        .setRequired(true);

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option.setName("member2").setDescription("A member to kick");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option.setName("member3").setDescription("A member to kick");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option.setName("member4").setDescription("A member to kick");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option.setName("member5").setDescription("A member to kick");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option.setName("member6").setDescription("A member to kick");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option.setName("member7").setDescription("A member to kick");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option.setName("member8").setDescription("A member to kick");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option.setName("member9").setDescription("A member to kick");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option.setName("member10").setDescription("A member to kick");

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const members: Array<User> = [];

    for (let index = 1; index < 11; index++) {
      const member = interaction.options.getUser("member" + index);

      if (member) {
        members.push(member);
      }
    }

    let reportText = "";

    for (let index = 0; index < members.length; index++) {
      const member = members[index];
      try {
        await interaction.guild.members.kick(member);
        reportText += `${member.tag}: Success\n`;
      } catch (e: any) {
        reportText += `${member.tag}: Failure\n`;
        handleError(interaction, e);
      }
    }

    const resultEmbed = new EmbedBuilder()
      .setColor("#ffffff")
      .setTitle("Kick Multiple - Report")
      .setDescription("Report of attempt to kick the given members.")
      .addFields({ name: "Members Affected", value: reportText });

    try {
      await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
