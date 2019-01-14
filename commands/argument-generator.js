const { prefix } = require('../config.json');

module.exports = {
    name:'argument-generator',
    description: 'breaks down string arguments',
    execute(message, args) {
        const tempArgs = message.content.slice(prefix.length).split(/ +/);
        const command = tempArgs.shift().toLowerCase();

        if (!args.length) {
            return message.channel.send(`You haven't provided any arguments, ${message.author}!`);
        }
        else {
            return message.channel.send(`Command: ${command} \nArguments: ${args}`);
        }
    },
};
