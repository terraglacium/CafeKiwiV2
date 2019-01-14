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

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(message.content);

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
            return message.channel.send(`You haven't provided any arguments, ${message.author}!`);
        }
        else {
            return message.channel.send(`Command: ${command} \nArguments: ${args}`);
        }

    }
    else if (command === 'first-argument') {
        if (!args.length) {
            return message.channel.send(`You haven't provided any arguments, ${message.author}!`);
        }
        else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }

        message.channel.send(`Your first argument is ${args[0]}`);
    }
    else if (command === 'tag') {
        if(!message.mentions.users.size) {
            return message.reply('You need to tag a user...');
        }

        const taggedUser = message.mentions.users.first();

        message.channel.send(`You tagged ${taggedUser.username}!`);
    }
    else if (command === 'avatar') {
        if(!message.mentions.users.size) {
            return message.reply(`Your avatar link is <${message.author.displayAvatarURL}>`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
        });

        message.channel.send(avatarList);
    }
    else if (command === 'prune') {
        // console.log(amount);
        console.log(args[0]);
        const amount = parseInt(args[0]) + 1;
        // default is at least + 1 ^
        // console.log(amount);
        // console.log(args[0]);

        /* if(!args.length) {
            return message.reply('You need to enter a number...');
        }*/
        // const amount = parseInt(args[0]);
        if(isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number');
        }
        else if (amount <= 1 || amount > 100) {
            return message.reply('you\'ll need to input a number between 1 and 99');
        }

        message.channel.bulkDelete(amount, true).catch(err =>{
            console.error(err);
            message.channel.send('There was an error trying to prune messages in this channel!');
        });

        message.channel.send(`**Deleted ${amount} messages**`);
    }
    // length = 0 can be evaluated as a "false condition" ^^
});

client.login(token);
