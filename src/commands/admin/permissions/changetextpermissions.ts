import assert from "assert";
import {
  CacheType,
  ChannelType,
  EmbedBuilder,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandChannelOption,
  SlashCommandRoleOption,
  SlashCommandStringOption,
} from "discord.js";

import { handleError } from "../../../utils/helpers";
import {
  textPermissionsDisable,
  textPermissionsEnable,
} from "../../../utils/information";
import { ICommand } from "../../../utils/types";

const command: ICommand = {
  name: "changetextpermissions",
  command: new SlashCommandBuilder()
    .setName("changetextpermissions")
    .setDescription(
      "Changes or resets the given role's permissions in a text channel",
    )
    .addSubcommand((command) => {
      command
        .setName("reset")
        .setDescription(
          "Resets the permissions on the given role in the given channel",
        )
        .addChannelOption((option: SlashCommandChannelOption) => {
          option
            .setName("channel")
            .setDescription(
              "The text channel for which the permissions on the given role should be reset",
            )
            .setRequired(true);

          return option;
        })
        .addRoleOption((option: SlashCommandRoleOption) => {
          option
            .setName("role")
            .setDescription(
              "The role of which permissions should be reset in the given text channel",
            )
            .setRequired(true);

          return option;
        });

      return command;
    })
    .addSubcommand((command) => {
      command
        .setName("alter")
        .setDescription(
          "Adds or removes specific permissions on the given role in the given text channel",
        )
        .addChannelOption((option: SlashCommandChannelOption) => {
          option
            .setName("channel")
            .setDescription(
              "The text channel for which the permissions on the given role should be reset",
            )
            .setRequired(true);

          return option;
        })
        .addRoleOption((option: SlashCommandRoleOption) => {
          option
            .setName("role")
            .setDescription(
              "The role of which permissions should be altered in the given text channel",
            )
            .setRequired(true);

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("operation")
            .setDescription("Operation to apply")
            .setChoices(
              {
                name: "add",
                value: "add",
              },
              {
                name: "remove",
                value: "remove",
              },
            )
            .setRequired(true);

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission1")
            .setDescription(
              "A permission to change on the given role in the given text channel (e.g. SEND_MESSAGES)",
            )
            .setRequired(true);

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission2")
            .setDescription(
              "A permission to change on the given role in the given text channel (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission3")
            .setDescription(
              "A permission to change on the given role in the given text channel (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission4")
            .setDescription(
              "A permission to change on the given role in the given text channel (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission5")
            .setDescription(
              "A permission to change on the given role in the given text channel (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission6")
            .setDescription(
              "A permission to change on the given role in the given text channel (e.g. SEND_MESSAGES)",
            );
          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission7")
            .setDescription(
              "A permission to change on the given role in the given text channel (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission8")
            .setDescription(
              "A permission to change on the given role in the given text channel (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission9")
            .setDescription(
              "A permission to change on the given role in the given text channel (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission10")
            .setDescription(
              "A permission to change on the given role in the given text channel (e.g. SEND_MESSAGES)",
            );

          return option;
        });
      return command;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const roleId = interaction.options.getRole("role")!.id;
    const roleResolved = interaction.guild.roles.resolve(roleId)!;

    const channelId = interaction.options.getChannel("channel")!.id;
    const channelResolved = interaction.guild.channels.resolve(channelId)!;

    if (channelResolved.type !== ChannelType.GuildText) {
      throw Error("Cannot alter text permissions on non-text channel");
    }

    switch (interaction.options.getSubcommand()) {
      case "alter":
        const operation = interaction.options.getString("operation")!;

        const permissions: Array<string> = [];

        for (let index = 1; index < 11; index++) {
          const permission = interaction.options.getString(
            "permission" + index,
          );

          if (permission) {
            permissions.push(permission.toUpperCase());
          }
        }

        let reportText = "";

        for (const permission of permissions) {
          try {
            switch (operation) {
              case "add":
                channelResolved.permissionOverwrites.create(
                  roleResolved,
                  textPermissionsEnable.get(permission)!,
                );

                break;
              case "remove":
                channelResolved.permissionOverwrites.create(
                  roleResolved,
                  textPermissionsDisable.get(permission)!,
                );
                break;
            }

            reportText += `${permission}: Success\n`;
          } catch (e: any) {
            reportText += `${permission}: Failure\n`;
          }
        }

        const resultEmbed = new EmbedBuilder()
          .setColor("#ffffff")
          .setTitle("Alter Text Permissions - Report")
          .setDescription(
            `Report of attempt to alter permissions on the given role (${roleResolved.name}) in the given text channel (${channelResolved.name}).`,
          )
          .addFields({ name: "Permissions Changed", value: reportText });

        try {
          await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
        } catch (e: any) {
          handleError(interaction, e);
        }
        break;
      case "reset":
        try {
          const currentOverwrites =
            channelResolved.permissionOverwrites.cache.get(roleResolved.id);

          if (currentOverwrites) {
            await currentOverwrites.delete();
          }

          await interaction.reply({
            content: `Permissions on role ${roleResolved.name} reset succesfully in channel ${channelResolved.name}`,
            ephemeral: true,
          });
        } catch (e: any) {
          handleError(interaction, e);
        }
        break;
    }
  },
};

export = command;
