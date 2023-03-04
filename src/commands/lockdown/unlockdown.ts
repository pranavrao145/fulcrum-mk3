import assert from "assert";
import {
  CacheType,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

import { handleError } from "../../utils/helpers";
import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "unlockdown",
  command: new SlashCommandBuilder()
    .setName("unlockdown")
    .setDescription(
      "Unlocks all channels (including voice-based channels) in the server."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    try {
      await interaction.reply({
        content: `Beginning reversal of server lockdown sequence. This may take a moment...`,
        ephemeral: true,
      });

      const channels = await interaction.guild.channels.fetch();

      const textChannels = channels.filter((c) => c!.isTextBased()).values();
      const voiceChannels = channels.filter((c) => c!.isVoiceBased()).values();

      for (const textChannel of textChannels) {
        textChannel!.permissionOverwrites.edit(
          interaction.guild.roles.everyone,
          {
            SendMessages: null,
          }
        );
      }

      for (const voiceChannel of voiceChannels) {
        voiceChannel!.permissionOverwrites.create(
          interaction.guild.roles.everyone,
          {
            Connect: null,
          }
        );
      }

      await interaction.followUp({
        content: `Server lockdown sequence reversed successfully; since write and connect permissions for text and voice channels, respectively, were reset to default settings, you may need to adjust permissions to restore the full pre-lockdown state of the server`,
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
