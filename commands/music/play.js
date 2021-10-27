module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    utilisation: '{prefix}play [name/URL]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel!`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Specify the song you want to listen to!`);

        client.player.play(message, args.join(" "), { firstResult: true });
        console.log("Playing " + args.join(" "))
    }, catch (error) {
        console.error(error);
      }
};