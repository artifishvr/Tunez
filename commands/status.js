const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'status',
            description: 'Get the status of Tunez',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();
         
        // send to statcord
        const { statcord } = require('..');
        statcord.postCommand("Status", ctx.user.id);

        ctx.sendFollowUp({ content: `💻 | Currently in **${client.guilds.cache.size}** servers\n📶 | Ping: **${client.ws.ping}**\n🖥️ | View the full status page: <https://status.tunez.ml>` });
    }
};
