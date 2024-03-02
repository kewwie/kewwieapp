const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	Interaction,
	Client
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName('sendsmockers')
	.setDescription('adding soon ig')
	.addStringOption(option =>
		option
			.setName('users')
			.setDescription('Example: Kewi,Soja,Timjan')
			.setRequired(true)
	)		
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	/**
    * 
    * @param {Interaction} interaction
    * @param {Client} client
    */
	async execute(interaction, client) {
		var usersString = interaction.options.getString('users');
		var users = usersString.split(",");

		var buttons = [];
		var userText = "";

	    for (let user of users) {
			var button = new ButtonBuilder()
				.setCustomId('updatesmoker_' + user)
				.setLabel(user)
				.setStyle(ButtonStyle.Primary);

			buttons.push(button);
			userText += `${user}\n`
		}

		var rows = [];


		for (var i = 0; i < buttons.length; i += 5) {
			rows.push(
				new ActionRowBuilder()
					.addComponents(
						buttons.slice(i, (i + 5))
					)
			);
		}

		await interaction.reply({
			content: userText,
			components: rows,
		});
	},
}