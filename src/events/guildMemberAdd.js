import { Events, EmbedBuilder } from "discord.js";

export default {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const channelId = process.env.WELCOME_CHANNEL_ID;
    if (!channelId) return;

    const channel = member.guild.channels.cache.get(channelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(0x57f287)
      .setTitle("👋 Welcome!")
      .setDescription(`Hey ${member}, welcome to **${member.guild.name}**! You're member #${member.guild.memberCount}.`)
      .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
      .setTimestamp();

    await channel.send({ embeds: [embed] }).catch(() => {});
  },
};
