import assert from "assert";
import {
  CacheType,
  ColorResolvable,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandRoleOption,
  SlashCommandStringOption,
} from "discord.js";
import { handleError, isValidColor } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "changerolecolour",
  command: new SlashCommandBuilder()
    .setName("changerolecolour")
    .setDescription("Changes the colour of the given role to the given color.")
    .addRoleOption((option: SlashCommandRoleOption) => {
      option
        .setName("role")
        .setDescription("The role of which the colour should be changed")
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("colour")
        .setDescription("The colour code of the new role (with no hashtag)")
        .setMinLength(6)
        .setMaxLength(6)
        .setRequired(true);

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const roleId = interaction.options.getRole("role")!.id;
    const roleResolved = interaction.guild.roles.resolve(roleId)!;

    const colour = interaction.options.getString("colour");

    let colourResolvable: ColorResolvable | undefined = undefined;

    try {
      if (isValidColor("#" + colour)) {
        colourResolvable = ("#" + colour) as ColorResolvable;
      } else {
        throw Error("Could not resolve colour provided.");
      }
    } catch (e: any) {
      return handleError(interaction, e);
    }

    try {
      await roleResolved.setColor(colourResolvable);

      await interaction.reply({
        content: `Colour of role ${roleResolved.name} successfully changed to ${colourResolvable}`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
