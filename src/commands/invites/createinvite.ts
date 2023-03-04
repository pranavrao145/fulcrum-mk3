import assert from "assert";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBooleanOption,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandStringOption,
} from "discord.js";

import { handleError } from "../../utils/helpers";
import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "createinvite",
  command: new SlashCommandBuilder()
    .setName("createinvite")
    .setDescription(
      "Creates an invite to the current channel with the given parameters and displays the result"
    )
    .addBooleanOption((option: SlashCommandBooleanOption) => {
      option
        .setName("temporary")
        .setDescription(
          "Whether or not this invite should add users temporarily (default false)"
        );

      return option;
    })
    .addIntegerOption((option: SlashCommandIntegerOption) => {
      option
        .setName("seconds")
        .setDescription(
          "Number of seconds this invite should last (default 0, forever)"
        )
        .setMinValue(0)
        .setMaxValue(604800);

      return option;
    })
    .addIntegerOption((option: SlashCommandIntegerOption) => {
      option
        .setName("uses")
        .setDescription(
          "Max number of times this invite can be used (default 1)"
        );

      return option;
    })
    .addStringOption((option: SlashCommandStringOption) => {
      option
        .setName("reason")
        .setDescription(
          "The reason for the creation of the invite (default none)"
        )
        .setMaxLength(512);
      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.CreateInstantInvite),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const temporary = interaction.options.getBoolean("temporary") ?? false;
    const maxAge = interaction.options.getInteger("seconds") ?? 0;
    const maxUses = interaction.options.getInteger("uses") ?? 1;
    const reason =
      interaction.options.getString("reason") ?? "No reason provided.";

    try {
      const invite = await interaction.guild.invites.create(
        interaction.channel!.id,
        {
          temporary: temporary,
          maxAge: maxAge,
          maxUses: maxUses,
          reason: reason,
        }
      );

      const resultEmbed = new EmbedBuilder()
        .setColor("#ffffff")
        .setTitle("Create Invite - Result")
        .setDescription(
          `Information for invite generated by attempt to create invite using the given temporary flag, max age, max uses, and reason.`
        )
        .addFields({
          name: "Invite Information",
          value: `Code: ${invite.code}\nURL: ${invite.url}\nTemporary: ${
            invite.temporary
          }\nMax Age: ${
            invite.maxAge !== 0 ? invite.maxAge : "infinite"
          } seconds\nMax Uses: ${invite.maxUses}`,
        });

      await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
