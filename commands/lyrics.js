const { SlashCommand } = require('slash-create');
const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init();

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'lyrics',
            description: 'See lyrics for the current song',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();
         
        // send to statcord
        const { statcord } = require('..');
        statcord.postCommand("Lyrics", ctx.user.id);

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });

            const lyrics = await lyricsClient.search(queue.current.title, queue.current.artist);
            if (!lyrics) return void ctx.sendFollowUp({ content: '❌ | No lyrics found!' });
            return void ctx.sendFollowUp({
              embeds: [
                {
                  title: lyrics.artist.name + " - " + lyrics.title,
                  description: lyrics.lyrics,
                  color: 0xffffff,
                },
              ],
            });

        // thanks copilot

        
    }
};