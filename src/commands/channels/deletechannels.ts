import assert from "assert";
import {
  CacheType,
  ChannelResolvable,
  ChannelType,
  EmbedBuilder,
  GuildChannelResolvable,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandChannelOption,
} from "discord.js";
import { handleError } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "deletechannels",
  command: new SlashCommandBuilder()
    .setName("deletechannels")
    .setDescription("Deletes the given channel(s).")
    .addChannelOption((option: SlashCommandChannelOption) => {
      option
        .setName("channel1")
        .setDescription("A channel to be deleted")
        .setRequired(true);

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option.setName("channel2").setDescription("A channel to be deleted");

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option.setName("channel3").setDescription("A channel to be deleted");

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option.setName("channel4").setDescription("A channel to be deleted");

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option.setName("channel5").setDescription("A channel to be deleted");

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option.setName("channel6").setDescription("A channel to be deleted");

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option.setName("channel7").setDescription("A channel to be deleted");

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option.setName("channel8").setDescription("A channel to be deleted");

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option.setName("channel9").setDescription("A channel to be deleted");

      return option;
    })
    .addChannelOption((option: SlashCommandChannelOption) => {
      option.setName("channel10").setDescription("A channel to be deleted");

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const channels: Array<GuildChannelResolvable> = [];

    for (let index = 1; index < 11; index++) {
      const channel = interaction.options.getChannel("channel" + index);

      if (channel) {
        channels.push(channel.id);
      }
    }

    let reportText = "";

    for (const channelId of channels) {
      const channelResolved = interaction.guild.channels.resolve(channelId)!;

      try {
        await interaction.guild.channels.delete(channelResolved);

        reportText += `${channelResolved.name}: Success\n`;
      } catch (e: any) {
        reportText += `${channelResolved.name}: Failure\n`;
      }
    }

    const resultEmbed = new EmbedBuilder()
      .setColor("#ffffff")
      .setTitle("Delete Channels - Report")
      .setDescription(`Report of attempt to delete the given channel(s).`)
      .addFields({ name: "Channels Deleted", value: reportText });

    try {
      await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
