const Discord = require('discord.js');
// const config = require('./config.json');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    // console.log(message.content);

    if(message.content === prefix + 'ping') {
        message.channel.send('pong!');
    }
    else if (message.content.startsWith(`${prefix}channelProperties`)) {
        message.channel.send(`The current channel name is ${message.channel.name}, the server name is ${message.guild.name}, and the number of users on this server is ${message.guild.memberCount}.`);

        message.channel.send(`Cool fact! This server was created at ${message.guild.createdAt}.`);
    }
    else if (message.content.startsWith(`${prefix}authorProperties`)) {
        message.channel.send(`Your name is ${message.author.username} :)`);
    }
    else if (command === 'test-argument') {
        if (!args.length) {
            message.channel.send(`You haven't provided any arguments, ${message.author}!`);
        }
        else {
            message.channel.send(`Command: ${command} \nArguments: ${args}`);
        }

    }
    // length = 0 can be evaluated as a "false condition" ^^
});

client.login(token);
