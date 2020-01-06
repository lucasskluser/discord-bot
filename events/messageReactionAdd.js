import { addRole } from '../core/roleManager';

module.exports = async (client, reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();

  var roleName = reaction.emoji.name;
  var member = reaction.message.guild.members.find(
    member => member.id === user.id
  );

  if (member.user.bot) return;

  addRole(roleName, member, reaction.message.guild);
}