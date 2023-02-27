import assert from "assert";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandRoleOption,
  SlashCommandUserOption,
  User,
} from "discord.js";
import { handleError } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "removerole",
  command: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("Remove the given role from the given member(s).")
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role")
        .setDescription("The role to remove from the given member(s)")
        .setRequired(true);

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member1")
        .setDescription("A member from which the given role should be removed")
        .setRequired(true);

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member2")
        .setDescription("A member from which the given role should be removed");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member3")
        .setDescription("A member from which the given role should be removed");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member4")
        .setDescription("A member from which the given role should be removed");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member5")
        .setDescription("A member from which the given role should be removed");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member6")
        .setDescription("A member from which the given role should be removed");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member7")
        .setDescription("A member from which the given role should be removed");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member8")
        .setDescription("A member from which the given role should be removed");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member9")
        .setDescription("A member from which the given role should be removed");

      return option;
    })
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member10")
        .setDescription("A member from which the given role should be removed");

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const roleId = interaction.options.getRole("role")!.id;
    const roleResolved = interaction.guild.roles.resolve(roleId)!;

    const members: Array<User> = [];

    for (let index = 1; index < 11; index++) {
      const member = interaction.options.getUser("member" + index);

      if (member) {
        members.push(member);
      }
    }

    let reportText = "";

    for (const member of members) {
      try {
        await interaction.guild.members.removeRole({
          role: roleResolved,
          user: member,
        });
        reportText += `${member.tag}: Success\n`;
      } catch (e: any) {
        reportText += `${member.tag}: Failure\n`;
      }
    }

    const resultEmbed = new EmbedBuilder()
      .setColor("#ffffff")
      .setTitle("Remove Role - Report")
      .setDescription(
        `Report of attempt to remove the given role (${roleResolved.name}) from the given members.`
      )
      .addFields({ name: "Members Affected", value: reportText });

    try {
      await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
