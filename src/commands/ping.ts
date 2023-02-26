import assert from "assert";
import { Interaction, CacheType, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../utils/types";

const command: ICommand = {
  name: "ping",
  command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  execute: function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());

    interaction.reply("pong");
  },
};

export = command;
