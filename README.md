# Nova — a clean, modern Discord bot

A production-ready starter bot built with **discord.js v14** and slash commands. Moderation, utility, and fun commands in a tidy command-handler architecture. Built by [xonix](https://xonix-am14.netlify.app) · need a custom bot? [Hire me on LaborX](https://laborx.com/gigs/i-will-build-a-custom-discord-bot-for-your-server-in-48-hours-103949).

## ✨ Features

| Command | What it does | Permission |
|---|---|---|
| `/ping` | Latency check (roundtrip + API) | Everyone |
| `/userinfo [target]` | Member details: join date, roles, account age | Everyone |
| `/serverinfo` | Server stats: owner, members, channels, roles | Everyone |
| `/poll <question>` | Quick 👍/👎 reaction poll | Everyone |
| `/purge <amount>` | Bulk-delete 1–100 recent messages | Manage Messages |
| Welcome messages | Greets new members with an embed | Auto |

Clean, modular, and easy to extend — drop a new file in `src/commands/` and it's auto-loaded.

## 🚀 Setup

1. **Clone & install**
   ```bash
   git clone https://github.com/xonix97/nova-discord-bot.git
   cd nova-discord-bot
   npm install
   ```

2. **Create your bot** at the [Discord Developer Portal](https://discord.com/developers/applications) → New Application → Bot. Copy the **token** and **Application ID**. Under *Bot → Privileged Gateway Intents*, enable **Server Members Intent** and **Message Content Intent**.

3. **Configure**
   ```bash
   cp .env.example .env
   # fill in DISCORD_TOKEN, CLIENT_ID, and (optional) GUILD_ID / WELCOME_CHANNEL_ID
   ```

4. **Register slash commands**
   ```bash
   npm run deploy
   ```

5. **Run it**
   ```bash
   npm start
   ```

## 🧩 Project structure

```
src/
├── index.js              # client setup + command/event loaders
├── deploy-commands.js    # registers slash commands with Discord
├── commands/             # one file per command (auto-loaded)
│   ├── ping.js
│   ├── userinfo.js
│   ├── serverinfo.js
│   ├── poll.js
│   └── purge.js
└── events/               # gateway event handlers
    ├── interactionCreate.js
    └── guildMemberAdd.js
```

## 🛠 Built with
- [discord.js](https://discord.js.org/) v14
- Node.js 18+ (ESM)
- dotenv

## 📜 License
MIT — use it, learn from it, ship it.
