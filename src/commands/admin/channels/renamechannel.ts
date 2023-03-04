import assert from "assert";
import {
  CacheType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandChannelOption,
  SlashCommandStringOption,
} from "discord.js";

import { handleError } from "../../../utils/helpers";
import { ICommand } from "../../../utils/types";

const command: ICommand = {
  name: "renamechannel",
  command: new SlashCommandBuilder()
    .setName("renamechannel")
    .setDescription("Change the name of the given channel to the given name.")
    .addChannelOption((option: SlashCommandChannelOption) => {
      option
        .setName("channel")
        .setDescription("The channel to be renamed")
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name")
        .setDescription("The new name for the given channel")
        .setRequired(true);

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const channelId = interaction.options.getChannel("channel")!.id;
    const channelResolved = interaction.guild.channels.resolve(channelId)!;
    const oldName = channelResolved.name;

    const newName = interaction.options.getString("name")!;

    try {
      await channelResolved.setName(newName);

      await interaction.reply({
        content: `Channel ${oldName} successfully renamed to ${channelResolved.name}`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
