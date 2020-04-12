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
        var reactions = 0;
        collector.on('collect', (reaction, collector) => {
            reactions += 1;
            if (reactions === 3) {
                message.delete()
                    .then(message => {
                        const channel = client.channels.cache.get(config.log);
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Message Archived")
                            .setColor("#2F8ED4")
                            .addField("Author", message.author, true)
                            .addField("Message", message.content, true)
                        channel.send(embed);
                    });
            }
        });
    }
});


