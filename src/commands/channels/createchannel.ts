import assert from "assert";
import {
  CacheType,
  ChannelType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";
import { handleError } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "createchannel",
  command: new SlashCommandBuilder()
    .setName("createchannel")
    .setDescription("Creates a channel with the given name, type, and privacy.")
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("name")
        .setDescription("The name of the new channel")
        .setRequired(true);

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("type")
        .setDescription("The type of the new channel (default text)")
        .setChoices(
          {
            name: "text",
            value: "text",
          },
          {
            name: "voice",
            value: "voice",
          }
        );

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("privacy")
        .setDescription("The privacy of the new channel (default public)")
        .setChoices(
          {
            name: "public",
            value: "public",
          },
          {
            name: "private",
            value: "private",
          }
        );

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const name = interaction.options.getString("name")!;
    let typeRaw = interaction.options.getString("type") ?? "text";
    const privacy = interaction.options.getString("privacy") ?? "public";

    let type =
      typeRaw === "voice" ? ChannelType.GuildVoice : ChannelType.GuildText;

    try {
      const channel = await interaction.guild.channels.create({
        name: name,
        type: type,
      });

      if (privacy === "private") {
        channel.permissionOverwrites.set([
          {
            id: interaction.guild.roles.everyone.id,
            deny: ["ViewChannel"],
          },
        ]);
      }

      await interaction.reply({
        content: `Channel ${channel.name} successfully created with type ${typeRaw} and privacy ${privacy}`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
