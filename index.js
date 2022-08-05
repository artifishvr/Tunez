const dotenv = require("dotenv");
const path = require("path");
const { SlashCreator, GatewayServer } = require("slash-create");
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const { Player } = require("discord-player");
const Statcord = require("statcord.js");
const { registerPlayerEvents } = require("./events");
const { generateDocs } = require("./docs");

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages],
});

const statcord = new Statcord.Client({
  client,
  key: process.env.STATCORD_APIKEY,
  postCpuStatistics: false, 
    postMemStatistics: false, 
    postNetworkStatistics: false,
});

client.player = new Player(client);
registerPlayerEvents(client.player);

const creator = new SlashCreator({
  applicationID: process.env.DISCORD_CLIENT_ID,
  token: process.env.DISCORD_CLIENT_TOKEN,
});

client.on("ready", () => {
  client.user.setActivity("some tunes | tunez.ml", {
    type: ActivityType.Listening,
  });
  setInterval(() => {
    client.user.setActivity("some tunes | tunez.ml", {
      type: ActivityType.Listening,
    });
  }, 3600000);

  console.log(`Logging in as ${client.user.tag}`);

  console.log("Updating Commands.md...");
  generateDocs(creator.commands);
  console.log("Ready!");
  statcord.autopost();
});

statcord.on("autopost-start", () => {
  // Emitted when statcord autopost starts
  console.log("Started Statcord Autopost");
});

creator
  .withServer(
    new GatewayServer((handler) => client.ws.on("INTERACTION_CREATE", handler))
  )
  .registerCommandsIn(path.join(__dirname, "commands"));

creator.syncCommands();

client.login(process.env.DISCORD_CLIENT_TOKEN);
module.exports = {
  client,
  creator,
  statcord,
};