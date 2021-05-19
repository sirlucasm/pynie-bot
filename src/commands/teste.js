
module.exports = {
    name: 'teste',
    aliases: ['teste', 'testeeee'],
    async execute(client, message, args) {
		message.channel.send('ok');
	}
}
