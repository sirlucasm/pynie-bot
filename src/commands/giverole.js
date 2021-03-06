module.exports = {
    name: 'giverole',
	description: 'Add a role to an user on Server',
    aliases: ['giveRole', 'give_role'],
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
			.then(() => {
				if (!memberMentioned.roles.cache.has(role.id)) {
					message.reply(`Congrats!🎉🎉\nThe user${mention} is now a ${roleName}`);
				} else message.reply(`The user already have this role`);
			})
			.catch(error => {
				console.log(error);
				message.reply(`You do not have permissions`);
			});
	}
}
