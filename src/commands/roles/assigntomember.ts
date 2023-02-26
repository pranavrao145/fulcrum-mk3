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
  name: "assigntomember",
  command: new SlashCommandBuilder()
    .setName("assigntomember")
    .setDescription("Assigns the given member the given role(s).")
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member")
        .setDescription(
          "The member to which the given role(s) should be assigned"
        )
        .setRequired(true);

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role1")
        .setDescription("A role to be assigned to the given member")
        .setRequired(true);

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role2")
        .setDescription("A role to be assigned to the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role3")
        .setDescription("A role to be assigned to the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role4")
        .setDescription("A role to be assigned to the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role5")
        .setDescription("A role to be assigned to the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role6")
        .setDescription("A role to be assigned to the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role7")
        .setDescription("A role to be assigned to the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role8")
        .setDescription("A role to be assigned to the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role9")
        .setDescription("A role to be assigned to the given member");

      return option;
    })
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role10")
        .setDescription("A role to be assigned to the given member");

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
        await interaction.guild.members.addRole({
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
      .setTitle("Assign To User - Report")
      .setDescription(
        `Report of attempt to assign the given member (${member.tag}) the given role(s).`
      )
      .addFields({ name: "Roles Assigned", value: reportText });

    try {
      await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
