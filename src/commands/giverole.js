module.exports = {
    name: 'giverole',
	description: 'Add a role to an user on Server',
    aliases: ['teste', 'testeeee'],
	expectedArgs: '<User @mention> <Role name>',
	permisions: 'MANAGE_ROLES_OR_PERMISSIONS',
    async execute(client, message, args) {
		const userMention = message.mentions.users.first();
		if (!userMention) {
			message.reply('Please specify someone to give a role to');
			return;
		}
		const mention = args.shift();
		const roleName = args.join(' ');
		const { guild } = message;
		
		const role = guild.roles.cache.find((role) => {
			return role.name == roleName;
		});
		
		if (!role) {
			message.reply(`There is no role with the name: ${roleName}`);
			return;
		}

		const memberMentioned = guild.members.cache.get(userMention.id);
		memberMentioned.roles.add(role)
			.then(() => message.reply(`Congrats!🎉🎉\nThe user${mention} is now a ${roleName}`))
			.catch(console.error);
		// message.reply(`this user already have the role ${roleName}`);

	}
}
