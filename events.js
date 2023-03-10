module.exports.registerPlayerEvents = (player) => {

    player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
        queue.metadata.send(`❗ | There was an error playing that song, please try again.`);
    });
    player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
        queue.metadata.send(`❗ | There was an error playing that song, please try again.`);
    });

    player.on("trackStart", (queue, track) => {
        queue.metadata.send(`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
    });

    player.on("trackAdd", (queue, track) => {
        queue.metadata.send(`🎶 | Track **${track.title}** queued!\n:warning: Tunez is reaching end of life, learn more at <https://tunez.ml/eol>`);
    });

    player.on("botDisconnect", (queue) => {
        try {
            queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
        } catch (error) {
            console.error(error)
        }
    });

    player.on("channelEmpty", (queue) => {
        try {
            queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
        } catch (error) {
            console.error(error)
        }
        
    });

    player.on("queueEnd", (queue) => {
        queue.metadata.send("✅ | Queue finished!");
    });
};