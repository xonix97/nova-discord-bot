import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Show info about a member.")
    .addUserOption((opt) =>
      opt.setName("target").setDescription("The member to look up").setRequired(false),
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("target") ?? interaction.user;
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle(`${user.username}`)
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: "ID", value: user.id, inline: true },
        { name: "Bot", value: user.bot ? "Yes" : "No", inline: true },
        {
          name: "Account created",
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`,
          inline: false,
        },
      );

    if (member) {
      embed.addFields(
        {
          name: "Joined server",
          value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`,
          inline: false,
        },
        {
          name: `Roles (${member.roles.cache.size - 1})`,
          value:
            member.roles.cache
              .filter((r) => r.id !== interaction.guild.id)
              .map((r) => r.toString())
              .join(" ") || "None",
          inline: false,
        },
      );
    }

    await interaction.reply({ embeds: [embed] });
  },
};
