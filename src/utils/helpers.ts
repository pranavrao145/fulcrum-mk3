import { CacheType, ChatInputCommandInteraction } from "discord.js";

export async function handleError(
  interaction: ChatInputCommandInteraction<CacheType>,
  err: any
) {
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }

  console.error(err);
}

export function isValidColor(colour: string) {
  return /^#([0-9A-F]{3}){1,2}$/i.test(colour);
}

export function getRandomInteger(start: number, end: number) {
  start = Math.ceil(start);
  end = Math.floor(end);
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
