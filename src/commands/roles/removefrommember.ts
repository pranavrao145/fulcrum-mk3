import assert from "assert";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  PermissionFlagsBits,
  RoleResolvable,
  SlashCommandBuilder,
  SlashCommandRoleOption,
  SlashCommandUserOption,
} from "discord.js";
import { handleError } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "removefrommember",
  command: new SlashCommandBuilder()
    .setName("removefromuser")
    .setDescription(
      "Removes the given role(s) from the given the given member ."
    )
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member")
        .setDescription(
          "The member from which the given role(s) should be removed"
        )
        .setRequired(true);

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role1")
        .setDescription("A role to be removed from the given member")
        .setRequired(true);

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role2")
        .setDescription("A role to be removed from the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role3")
        .setDescription("A role to be removed from the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role4")
        .setDescription("A role to be removed from the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role5")
        .setDescription("A role to be removed from the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role6")
        .setDescription("A role to be removed from the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role7")
        .setDescription("A role to be removed from the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role8")
        .setDescription("A role to be removed from the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role9")
        .setDescription("A role to be removed from the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role10")
        .setDescription("A role to be removed from the given member");

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const member = interaction.options.getUser("member")!;
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
        await interaction.guild.members.removeRole({
          role: roleResolved,
          user: member,
        });

        reportText += `${roleResolved.name}: Success\n`;
      } catch (e: any) {
        reportText += `${roleResolved.name}: Failure\n`;
      }
    }

    const resultEmbed = new EmbedBuilder()
      .setColor("#ffffff")
      .setTitle("Remove From User - Report")
      .setDescription(
        `Report of attempt to remove the given roles from the given member (${member.tag}).`
      )
      .addFields({ name: "Roles Removed", value: reportText });

    try {
      await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
