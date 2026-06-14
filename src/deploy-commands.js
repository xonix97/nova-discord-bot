import { REST, Routes } from "discord.js";
import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

const commands = [];
const commandsPath = join(__dirname, "commands");
for (const file of readdirSync(commandsPath).filter((f) => f.endsWith(".js"))) {
  const command = await import(pathToFileURL(join(commandsPath, file)).href);
  if ("data" in command.default) commands.push(command.default.data.toJSON());
}

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error("❌ Missing DISCORD_TOKEN or CLIENT_ID in .env");
  process.exit(1);
}

const rest = new REST().setToken(DISCORD_TOKEN);

try {
  console.log(`Deploying ${commands.length} command(s)…`);
  const route = GUILD_ID
    ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
    : Routes.applicationCommands(CLIENT_ID);
  await rest.put(route, { body: commands });
  console.log(
    GUILD_ID
      ? "✅ Deployed to your dev guild (instant)."
      : "✅ Deployed globally (may take up to 1 hour to appear).",
  );
} catch (err) {
  console.error(err);
}
