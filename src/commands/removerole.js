module.exports = {
    name: 'removerole',
	description: 'Remove a role to an user on Server',
    aliases: ['removeRole', 'remove_role'],
	expectedArgs: '<User @mention> <Role name>',
	permisions: 'MANAGE_ROLES_OR_PERMISSIONS',
    async execute(client, message, args) {
		const userMention = message.mentions.users.first();
		if (!userMention) {
			message.reply('Please specify someone to remove a role to');
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
		if (memberMentioned.roles.cache.has(role.id)) {
			memberMentioned.roles.remove(role)
				.then(() => message.reply(`😔 The user${mention} is no more a ${roleName}`))
				.catch(error => {
					console.log(error);
					message.reply(`You do not have permissions`);
				});
		} else message.reply(`This user do not have this role`);
	}
}
