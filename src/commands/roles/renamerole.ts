import assert from "assert";
import {
  CacheType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandRoleOption,
  SlashCommandStringOption,
} from "discord.js";
import { handleError } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "renamerole",
  command: new SlashCommandBuilder()
    .setName("renamerole")
    .setDescription("Changes the name of the given role to the name given.")
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role")
        .setDescription("The role to be renamed")
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name")
        .setDescription("The new name for the given role")
        .setRequired(true);

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const roleId = interaction.options.getRole("role")!.id;
    const roleResolved = interaction.guild.roles.resolve(roleId)!;
    const oldName = roleResolved.name;

    const newName = interaction.options.getString("name")!;

    try {
      await roleResolved.setName(newName);

      await interaction.reply({
        content: `Role ${oldName} successfully renamed to ${roleResolved.name}`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
