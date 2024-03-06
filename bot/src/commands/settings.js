const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	Interaction,
	Client
} = require("discord.js");
const { env } = require("../env");
const axios = require("axios");
const Database = require("../data/database");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Change the settings for your server')
		.addStringOption(option => 
            option
                .setName('option')
                .setDescription('Select the option you want to change')
                .addChoices(
                    { name: 'Logs', value: 'logsChannel' },
                    { name: 'Verified Role', value: 'verifiedRole' },
                    { name: 'Verification Admin', value: 'verificationAdmin' },
                    { name: "Pending Verification Channel", value: "pendingChannel" }
                )
                .setRequired(true)
        )
        .addStringOption(option => 
            option
                .setName('value')
                .setDescription('What value should the option be')
                .setRequired(true),
        ),

	/**
    * 
    * @param {Interaction} interaction
    * @param {Client} client
    */
	async execute(interaction, client) {

        var option = interaction.options.getString("option");
        var value = interaction.options.getString("value");

        var exist = await Database.query(`SELECT * FROM verification WHERE guildId = '${interaction.guildId}'`);
        if (exist[0].length > 0) {
            await Database.query(`UPDATE verification SET ${option} = '${value}' WHERE guildId = '${interaction.guildId}'`);
        } else {
            await Database.query(`INSERT INTO verification (guildId, ${interaction.guildId}) VALUES ('${option}', '${value}')`);
        }
	

		await interaction.reply({
			content: `Updated Settings for ${interaction.guild.name}`,
			ephemeral: true
		});
	},
}