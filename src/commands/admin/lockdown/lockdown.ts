import assert from "assert";
import {
  CacheType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBooleanOption,
  SlashCommandBuilder,
} from "discord.js";

import { handleError } from "../../../utils/helpers";
import { ICommand } from "../../../utils/types";

const command: ICommand = {
  name: "lockdown",
  command: new SlashCommandBuilder()
    .setName("lockdown")
    .setDescription(
      "Locks all channels (including voice-based channels) in the server, optionally deleting all invites.",
    )
    .addBooleanOption((option: SlashCommandBooleanOption) => {
      option
        .setName("delete")
        .setDescription(
          "Whether or not to delete all server invites (default false)",
        );

      return option;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const deleteInvites = interaction.options.getBoolean("delete");

    try {
      await interaction.reply({
        content: `Beginning server lockdown sequence. This may take a moment...`,
        ephemeral: true,
      });

      const channels = await interaction.guild.channels.fetch();

      const textChannels = channels.filter((c) => c!.isTextBased()).values();
      const voiceChannels = channels.filter((c) => c!.isVoiceBased()).values();

      for (const textChannel of textChannels) {
        textChannel!.permissionOverwrites.create(
          interaction.guild.roles.everyone,
          {
            SendMessages: false,
          },
        );
      }

      for (const voiceChannel of voiceChannels) {
        voiceChannel!.permissionOverwrites.create(
          interaction.guild.roles.everyone,
          {
            Connect: false,
          },
        );
      }

      if (deleteInvites) {
        const invites = await interaction.guild.invites.fetch();
        for (const invite of invites.values()) {
          await invite.delete();
        }
      }

      await interaction.followUp({
        content: `Server locked down successfully; to reverse lockdown, use the unlockdown command`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
