const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const events = require('./functions/events')

const client = new Client();
client.event = new Collection();
client.commands = new Collection();

module.exports = {
	run() {
		const commandsDir = join(__dirname, ".", "commands");
		const commandFiles = readdirSync(commandsDir).filter(file => file.endsWith('.js'))

		for (let index = 0; index < commandFiles.length; index++) {
			const command = require(`./commands/${commandFiles[index]}`);
			client.commands.set(command.name, command);
		}

		{ events.run(client); }

		client.login(process.env.BOT_TOKEN);
	}
}
