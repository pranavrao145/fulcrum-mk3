import assert from "assert";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";

import { handleError } from "../../utils/helpers";
import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "createroles",
  command: new SlashCommandBuilder()
    .setName("createroles")
    .setDescription("Creates new role(s) with the given name(s).")
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name1")
        .setDescription("The name of a role to be created")
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name2")
        .setDescription("The name of a role to be created");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name3")
        .setDescription("The name of a role to be created");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name4")
        .setDescription("The name of a role to be created");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name5")
        .setDescription("The name of a role to be created");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name6")
        .setDescription("The name of a role to be created");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name7")
        .setDescription("The name of a role to be created");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name8")
        .setDescription("The name of a role to be created");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name9")
        .setDescription("The name of a role to be created");

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name10")
        .setDescription("The name of a role to be created");

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const roleNames: Array<string> = [];

    for (let index = 1; index < 11; index++) {
      const name = interaction.options.getString("name" + index);

      if (name) {
        roleNames.push(name);
      }
    }

    let reportText = "";

    for (let index = 0; index < roleNames.length; index++) {
      const roleName = roleNames[index];

      try {
        const roleResolved = await interaction.guild.roles.create({
          name: roleName,
        });

        reportText += `${roleResolved.name}: Success\n`;
      } catch (e: any) {
        reportText += `${roleName}: Failure\n`;
      }
    }

    const resultEmbed = new EmbedBuilder()
      .setColor("#ffffff")
      .setTitle("Create Roles - Report")
      .setDescription(
        `Report of attempt to create new role(s) with the given name(s).`
      )
      .addFields({ name: "Roles Created", value: reportText });

    try {
      await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
