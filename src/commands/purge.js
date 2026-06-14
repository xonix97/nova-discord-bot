import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Bulk-delete recent messages in this channel.")
    .addIntegerOption((opt) =>
      opt
        .setName("amount")
        .setDescription("How many messages to delete (1-100)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    const deleted = await interaction.channel.bulkDelete(amount, true).catch(() => null);
    if (!deleted) {
      return interaction.reply({
        content: "⚠️ Couldn't delete — messages older than 14 days can't be bulk-removed.",
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `🧹 Deleted **${deleted.size}** message(s).`,
      ephemeral: true,
    });
  },
};
