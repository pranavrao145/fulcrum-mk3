import assert from "assert";
import {
  CacheType,
  EmbedBuilder,
  Interaction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandRoleOption,
  SlashCommandStringOption,
} from "discord.js";
import { handleError } from "../../../utils/helpers";
import { generalPermissions } from "../../../utils/information";
import { ICommand } from "../../../utils/types";

const command: ICommand = {
  name: "changegeneralpermissions",
  command: new SlashCommandBuilder()
    .setName("changegeneralpermissions")
    .setDescription(
      "Changes or resets the given role's permissions on the server",
    )
    .addSubcommand((command) => {
      command
        .setName("reset")
        .setDescription("Resets the permissions on the given role")
        .addRoleOption((option: SlashCommandRoleOption) => {
          option
            .setName("role")
            .setDescription("The role of which permissions should be reset")
            .setRequired(true);

          return option;
        });

      return command;
    })
    .addSubcommand((command) => {
      command
        .setName("alter")
        .setDescription("Adds or removes specific permission on the given role")
        .addRoleOption((option: SlashCommandRoleOption) => {
          option
            .setName("role")
            .setDescription("The role of which permissions should be altered")
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
              "A permission to change on the given role (e.g. SEND_MESSAGES)",
            )
            .setRequired(true);

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission2")
            .setDescription(
              "A permission to change on the given role (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission3")
            .setDescription(
              "A permission to change on the given role (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission4")
            .setDescription(
              "A permission to change on the given role (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission5")
            .setDescription(
              "A permission to change on the given role (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission6")
            .setDescription(
              "A permission to change on the given role (e.g. SEND_MESSAGES)",
            );
          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission7")
            .setDescription(
              "A permission to change on the given role (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission8")
            .setDescription(
              "A permission to change on the given role (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission9")
            .setDescription(
              "A permission to change on the given role (e.g. SEND_MESSAGES)",
            );

          return option;
        })
        .addStringOption((option: SlashCommandStringOption) => {
          option
            .setName("permission10")
            .setDescription(
              "A permission to change on the given role (e.g. SEND_MESSAGES)",
            );

          return option;
        });
      return command;
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  execute: async function (interaction: Interaction<CacheType>) {
    assert(interaction.isChatInputCommand());
    assert(interaction.guild);

    const roleId = interaction.options.getRole("role")!.id;
    const roleResolved = interaction.guild.roles.resolve(roleId)!;

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
          const currentPermissions = roleResolved.permissions;

          try {
            switch (operation) {
              case "add":
                currentPermissions.add(generalPermissions.get(permission)!);
                await roleResolved.setPermissions(currentPermissions);

                break;
              case "remove":
                currentPermissions.remove(generalPermissions.get(permission)!);
                await roleResolved.setPermissions(currentPermissions);
                break;
            }

            reportText += `${permission}: Success\n`;
          } catch (e: any) {
            reportText += `${permission}: Failure\n`;
          }
        }

        const resultEmbed = new EmbedBuilder()
          .setColor("#ffffff")
          .setTitle("Alter General Permissions - Report")
          .setDescription(
            `Report of attempt to alter permissions on the given role (${roleResolved.name}).`,
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
          roleResolved.setPermissions(0n);
          await interaction.reply({
            content: `Permissions on role ${roleResolved.name} reset succesfully`,
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
