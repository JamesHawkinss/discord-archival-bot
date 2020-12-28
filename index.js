const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config/config.json');

client.login(config.discord.token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (config.channels.includes(message.channel.id)) {
        message.react('✅');
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            return;
        }
    }
    if (reaction.emoji.name == "✅" && reaction.count === 2 && config.channels.includes(reaction.message.channel.id)) {
        const reactorUsername = user.username;
        reaction.message.delete()
            .then((reaction, user => {
                const channel = client.channels.cache.get(config.log);
                const embed = new Discord.MessageEmbed()
                    .setColor("#2F8ED4")
                    .setAuthor(reaction.message.author.username, reaction.message.author.avatarURL())
                    .setDescription(reaction.message.content)
                    .addField("From", reaction.message.channel, true)
                    .addField("Marked by", reactorUsername, true)
                    .setFooter("✅ complete")
                    .setTimestamp(Date.now());
                channel.send(embed);
            }));
    }
});
