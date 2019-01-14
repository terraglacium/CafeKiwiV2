module.exports = {
    name:'avatar',
    description: 'Tags multiple users and returns their avatar',
    execute(message, args) {
        if(!message.mentions.users.size) {
            return message.reply(`Your avatar link is <${message.author.displayAvatarURL}>`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
        });

        message.channel.send(avatarList);
    },
};
