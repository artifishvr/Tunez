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

        ctx.sendFollowUp({ content: `💻 | Currently in **${client.guilds.cache.size}** servers\n📶 | Ping: **${client.ws.ping}**` });
    }
};
