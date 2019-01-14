module.exports = {
    name:'tag',
    description: 'tags a single user',
    execute(message, args) {
        if(!message.mentions.users.size) {
            return message.reply('You need to tag a user...');
        }

        const taggedUser = message.mentions.users.first();

        message.channel.send(`You tagged ${taggedUser.username}!`);
    },
};
