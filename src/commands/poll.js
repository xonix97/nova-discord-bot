import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a quick yes/no reaction poll.")
    .addStringOption((opt) =>
      opt.setName("question").setDescription("What are you asking?").setRequired(true),
    ),
  async execute(interaction) {
    const question = interaction.options.getString("question");

    const embed = new EmbedBuilder()
      .setColor(0xfee75c)
      .setTitle("📊 Poll")
      .setDescription(question)
      .setFooter({ text: `Asked by ${interaction.user.username}` })
      .setTimestamp();

    const message = await interaction.reply({ embeds: [embed], fetchReply: true });
    await message.react("👍");
    await message.react("👎");
  },
};
