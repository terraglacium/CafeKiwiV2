module.exports = {
    name:'properties',
    description: 'channel and server properties',
    execute(message, args) {
        message.channel.send(`The current channel name is ${message.channel.name}, the server name is ${message.guild.name}, and the number of users on this server is ${message.guild.memberCount}.`);

        message.channel.send(`Cool fact! This server was created at ${message.guild.createdAt}.`);
    },
};
