module.exports = {
    name:'prune',
    description: 'Prunes a given number of message lines + 1',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;
        // default is at least + 1 ^

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
        // length = 0 can be evaluated as a "false condition" ^^
    },
};
