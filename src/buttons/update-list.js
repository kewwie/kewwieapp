const { Interaction, Client } = require("discord.js");
const Database = require("../data/database");

module.exports = {
    data: {
        id: "update-list",
    },
    /**
    * 
    * @param {Interaction} interaction
    * @param {Client} client
    */
    async execute(interaction, client) {
        var userToMove = interaction.customId.split("_")[1];
        var users = interaction.message.content.split("\n");

        let index = users.indexOf(userToMove);
    
        if (index !== -1) {
            users.splice(index, 1);
            users.push(userToMove);
        }
        
        var content = users.join("\n");
        
        interaction.update({ content });

        var servers = await Database.query(`SELECT logsChannel FROM servers WHERE guildId = '${interaction.guildId}'`, { plain: true, logging: false });
        if (servers.logsChannel) {

            var log = await interaction.guild.channels.cache.get(servers.logsChannel);
            await log.send(`<@${interaction.user.id}> has moved down **${userToMove}** in [list](${interaction.message.url})`);
        }
    }
}