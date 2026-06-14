import { Client, Collection, GatewayIntentBits, Events } from "discord.js";
import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandsPath = join(__dirname, "commands");
for (const file of readdirSync(commandsPath).filter((f) => f.endsWith(".js"))) {
  const command = await import(pathToFileURL(join(commandsPath, file)).href);
  if ("data" in command.default && "execute" in command.default) {
    client.commands.set(command.default.data.name, command.default);
  } else {
    console.warn(`[warn] ${file} is missing "data" or "execute".`);
  }
}

const eventsPath = join(__dirname, "events");
for (const file of readdirSync(eventsPath).filter((f) => f.endsWith(".js"))) {
  const event = await import(pathToFileURL(join(eventsPath, file)).href);
  if (event.default.once) {
    client.once(event.default.name, (...args) => event.default.execute(...args));
  } else {
    client.on(event.default.name, (...args) => event.default.execute(...args));
  }
}

client.once(Events.ClientReady, (c) => {
  console.log(`✅ Logged in as ${c.user.tag} — serving ${c.guilds.cache.size} server(s).`);
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error("❌ Missing DISCORD_TOKEN. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

client.login(token);
