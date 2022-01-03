const { SlashCommand, CommandOptionType } = require('slash-create');
const { QueryType } = require('discord-player');
const playdl = require("play-dl");

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'play',
            description: 'Play a song from youtube',
            options: [
                {
                    name: 'query',
                    type: CommandOptionType.STRING,
                    description: 'The song you want to play',
                    required: true
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const guild = client.guilds.cache.get(ctx.guildID);
        const channel = guild.channels.cache.get(ctx.channelID);
        const query = ctx.options.query;
        const searchResult = await client.player
            .search(query, {
                requestedBy: ctx.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('he');
            });
        if (!searchResult || !searchResult.tracks.length) return void ctx.sendFollowUp({ content: 'No results were found!' });

        const queue = await client.player.createQueue(guild, {
            metadata: channel,
            // use play-dl
            async onBeforeCreateStream(track, source, _queue) {
                if (track.url.includes('youtube') || track.url.includes("youtu.be")) {
                    try {
                        return (await playdl.stream(track.url)).stream;
                    } catch (err) {
                        return _queue.metadata.m.errorMessage("This video is restricted. Try with another link.")
                    }
                } else if (track.url.includes('spotify')) {
                    try {
                        let songs = await client.player.search(`${track.author} ${track.title} `, {
                            requestedBy: message.member,
                        }).catch().then(x => x.tracks[0]);
                        return (await playdl.stream(songs.url)).stream;
                    } catch (err) {
                        console.log(err)
                    }
                } else if (track.url.includes('soundcloud')) {
                    try {
                        return (await playdl.stream(track.url)).stream;
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        });

        const member = guild.members.cache.get(ctx.user.id) ?? await guild.members.fetch(ctx.user.id);
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
            
        } catch {
            void client.player.deleteQueue(ctx.guildID);
            return void ctx.sendFollowUp({ content: 'Could not join your voice channel!' });
        }

        await ctx.sendFollowUp({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    }
};
