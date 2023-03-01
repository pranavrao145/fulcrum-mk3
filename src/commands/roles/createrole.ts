import assert from "assert";
import {
  CacheType,
  ColorResolvable,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";

import { handleError, isValidColor } from "../../utils/helpers";
import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "createrole",
  command: new SlashCommandBuilder()
    .setName("createrole")
    .setDescription("Creates a role with the given name and given colour.")
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name")
        .setDescription("The name of the new role")
        .setMaxLength(512)
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("colour")
        .setDescription("The colour code of the new role (with no hashtag)")
        .setMinLength(6)
        .setMaxLength(6);

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const name = interaction.options.getString("name")!;
    const colour = interaction.options.getString("colour");

    let colourResolvable: ColorResolvable | undefined = undefined;

    if (colour) {
      try {
        if (isValidColor("#" + colour)) {
          colourResolvable = ("#" + colour) as ColorResolvable;
        } else {
          throw Error("Could not resolve colour provided.");
        }
      } catch (e: any) {
        return handleError(interaction, e);
      }
    }

    try {
      const role = await interaction.guild.roles.create({
        name: name,
        color: colourResolvable,
      });

      await interaction.reply({
        content: `Role ${role.name} successfully created with colour ${
          colourResolvable ?? "no colour provided"
        }.`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
