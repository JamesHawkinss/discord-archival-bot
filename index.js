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
        const filter = (reaction, user) => reaction.emoji.name === "✅";
        let collector = message.createReactionCollector(filter);
        collector.on('collect', (reaction, collector) => {
            if (reaction.count === 3) {
                message.delete().then((message) => {
                        const channel = client.channels.cache.get(config.log);
                        const embed = new Discord.MessageEmbed()
                            .setColor("#2F8ED4")
                            .setAuthor(message.author.username, message.author.avatarURL())
                            .setDescription(message.content)
                            .addField("From", message.channel, true)
                            .setFooter("✅ complete")
                            .setTimestamp(Date.now())
                        channel.send(embed);
                    });
            }
        });
    }
});


