/**
 * @file The script where CafeKiwi lives
 * @author Andy Ren (a.k.a @terraglacium)
 * @license MIT
 */

const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();
const { prefix } = require('./config.json');

const client = new Discord.Client();
// creates new Collection
client.commands = new Discord.Collection();

// fetches [command.js] files in the ./commands folder and creates local file Collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for of loop that sets the commandFiles Collection as commands in the Discord.Collection
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // command is variable that stores the corresponding command object file in commandFiles Collection
    client.commands.set(command.name, command);
    // sets the command object in commandFiles to the Discord.Collection.
}

// event that occurs once at startup
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('with fire', { type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.game.name}`))
        .catch(console.error);
});

// if function doesn't start with prefix or is sent by a bot, then don't handle event
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    // arguments are obtained by breaking down message content into a "array" of strings
    // commandName is the string obtained from the return of calling method shift()
    console.log(message.content);
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // if the Discord.Collection does not have the command object with commandName string, return
    if(!client.commands.has(commandName)) return;

    // command is variable that stores the object obtained from fetching
    // corresponding commandName in Discord.Collection
    const command = client.commands.get(commandName);

    // command object method .execute() is called, with params -> message object and args string
    try {
        command.execute(message, args);
    }
    catch(error) {
        console.error(error);
        message.reply('there was an error in processing your command.');
    }

});

// use process.env.TOKEN instead to fetch hidden .env file
// more secure method of protecting bot token
// TOKEN=somestringwithoutquotes
// or use process.env.CLIENT_TOKEN
// or process.env.DISCORD_TOKEN (v12 discord.js)
client.login(process.env.TOKEN);
