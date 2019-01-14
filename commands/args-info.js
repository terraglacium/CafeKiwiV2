module.exports = {
    name:'args-info',
    description: 'fetches first arg',
    execute(message, args) {

        if (!args.length) {
            return message.channel.send(`You haven't provided any arguments, ${message.author}!`);
        }
        else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }

        message.channel.send(`Your first argument is ${args[0]}`);
    },
};
