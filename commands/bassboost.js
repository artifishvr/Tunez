const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'bassboost',
            description: 'Toggle the bassboost filter',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        ctx.sendFollowUp({ content: `Due to an issue with discord-player, this command is temporarily disabled.\n
        Join https://discord.io/tunez for updates.` });
    }
};
