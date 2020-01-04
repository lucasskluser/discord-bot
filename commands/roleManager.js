function addRole(roleName, member) {
    var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());

    member
        .addRole(role.id)
        .catch(err => console.log(err));

    console.log(`${roleName} adicionado para ${member.user.username}`);
}

function removeRole(roleName, member) {
    var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());

    member
        .removeRole(role.id)
        .catch(err => console.log(err));

    console.log(`${roleName} removido para ${member.user.username}`);
}