import assert from "assert";
import {
  CacheType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandStringOption,
  SlashCommandUserOption,
} from "discord.js";
import { handleError } from "../../../utils/helpers";

import { ICommand } from "../../../utils/types";

const command: ICommand = {
  name: "changenickname",
  command: new SlashCommandBuilder()
    .setName("changenickname")
    .setDescription(
      "Changes the nickname of the given member to the name given.",
    )
    .addUserOption((option: SlashCommandUserOption) => {
      option
        .setName("member")
        .setDescription("The member whose nickname should be changed")
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name")
        .setDescription("The new nickname to assign to the given user")
        .setRequired(true);

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const memberId = interaction.options.getUser("member")!.id;
    const memberResolved = interaction.guild.members.resolve(memberId)!;

    const newName = interaction.options.getString("name")!;

    try {
      await memberResolved.setNickname(newName);

      await interaction.reply({
        content: `Nickname for user ${memberResolved.user.tag} successfully changed to ${memberResolved.nickname}`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
