/**
 * @file The script where CafeKiwi lives
 * @author Andy Ren (a.k.a @terraglacium)
 * @license MIT
 */

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // different from the command below...
    client.commands.set(command.name, command);
    // command.name is the name of the object, command is the object.
}

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('with fire', { type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.game.name}`))
        .catch(console.error);
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    console.log(message.content);
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    }
    catch(error) {
        console.error(error);
        message.reply('there was an error in processing your command.');
    }

});

client.login(token);
