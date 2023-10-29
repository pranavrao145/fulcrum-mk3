import assert from "assert";
import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";
import { handleError } from "../../utils/helpers";

import { ICommand } from "../../utils/types";

const command: ICommand = {
  name: "leavevoice",
  command: new SlashCommandBuilder()
    .setName("leavevoice")
    .setDescription(
      "Disconnects the member form the voice channel they are currently in.",
    ),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    try {
      const member = interaction.guild.members.resolve(interaction.user.id)!;

      await member.voice.setChannel(null);

      await interaction.reply({
        content: "Successfully disconnected you from the voice channel",
        ephemeral: true,
      });
    } catch (e: any) {
      handleError(interaction, e);
    }
  },
};

export = command;
