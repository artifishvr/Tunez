player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send(`:musical_note: - Now playing ${track.title} in **${queue.connection.channel.name}**`);
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`:musical_note: - Added ${track.title} to the queue`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send(':warning: - I was manually disconnected from the voice channel, clearing queue...');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send(':warning: - Music stopped as there is nobody in the voice channel!');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send(':white_check_mark: - I finished playing the whole queue!');
});