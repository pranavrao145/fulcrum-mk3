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

import { handleError } from "../../utils/helpers";
import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "deleteroles",
  command: new SlashCommandBuilder()
    .setName("deleteroles")
    .setDescription("Deletes the given role(s).")
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role1")
        .setDescription("A role to be deleted")
        .setRequired(true);

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role2").setDescription("A role to be deleted");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role3").setDescription("A role to be deleted");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role4").setDescription("A role to be deleted");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role5").setDescription("A role to be deleted");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role6").setDescription("A role to be deleted");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role7").setDescription("A role to be deleted");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role8").setDescription("A role to be deleted");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role9").setDescription("A role to be deleted");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option.setName("role10").setDescription("A role to be deleted");

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

    for (let index = 0; index < roles.length; index++) {
      const roleId = roles[index];
      const roleResolved = interaction.guild.roles.resolve(roleId)!;

      try {
        await interaction.guild.roles.delete(roleResolved);

        reportText += `${roleResolved.name}: Success\n`;
      } catch (e: any) {
        reportText += `${roleResolved.name}: Failure\n`;
      }
    }

    const resultEmbed = new EmbedBuilder()
      .setColor("#ffffff")
      .setTitle("Delete Roles - Report")
      .setDescription(`Report of attempt to delete the given role(s).`)
      .addFields({ name: "Roles Deleted", value: reportText });

    try {
      await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
