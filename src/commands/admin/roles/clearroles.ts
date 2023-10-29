import assert from "assert";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  PermissionFlagsBits,
  RoleResolvable,
  SlashCommandBuilder,
  SlashCommandRoleOption,
} from "discord.js";

import { handleError } from "../../../utils/helpers";
import { ICommand } from "../../../utils/types";

const command: ICommand = {
  name: "clearroles",
  command: new SlashCommandBuilder()
    .setName("clearroles")
    .setDescription(
      "Removes the given role(s) from every member that has them.",
    )
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role1")
        .setDescription("A role to be cleared")
        .setRequired(true);

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role2").setDescription("A role to be cleared");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role3").setDescription("A role to be cleared");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role4").setDescription("A role to be cleared");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role5").setDescription("A role to be cleared");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role6").setDescription("A role to be cleared");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role7").setDescription("A role to be cleared");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role8").setDescription("A role to be cleared");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role9").setDescription("A role to be cleared");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role10").setDescription("A role to be cleared");

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const roles: Array<RoleResolvable> = [];

    for (let index = 1; index < 11; index++) {
      const role = interaction.options.getRole("role" + index);

      if (role) {
        roles.push(role.id);
      }
    }

    let reportText = "";

    for (const roleId of roles) {
      const roleResolved = interaction.guild.roles.resolve(roleId)!;

      try {
        for (const member of roleResolved.members.values()) {
          await interaction.guild.members.removeRole({
            user: member,
            role: roleResolved,
          });
        }
        reportText += `${roleResolved.name}: Success\n`;
      } catch (e: any) {
        reportText += `${roleResolved.name}: Failure\n`;
      }
    }

    const resultEmbed = new EmbedBuilder()
      .setColor("#ffffff")
      .setTitle("Clear Roles - Report")
      .setDescription(`Report of attempt to clear the given role(s).`)
      .addFields({ name: "Roles Cleared", value: reportText });

    try {
      await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
