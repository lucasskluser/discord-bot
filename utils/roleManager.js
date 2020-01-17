module.exports = class RoleManager {
  constructor(client) {
    this.client = client;
  }

  findRole(roleName) {
    const roles = this.client.guilds.get(process.env.GUILD_ID).roles;
    return roles.find(role => role.name.toLowerCase() === roleName);
  }

  addRole(roleName, member) {
    const role = this.findRole(roleName);

    if (role === null) {
      throw new Error(`Role '${roleName}' not found.`);
    }

    return member.addRole(role.id);
  }

  removeRole(roleName, member) {
    const role = this.findRole(roleName);

    if (role === null) {
      throw new Error(`Role '${roleName}' not found.`);
    }

    return member.removeRole(role.id);
  }
};
