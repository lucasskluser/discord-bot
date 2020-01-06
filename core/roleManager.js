/**
 * Funções responsáveis por adicionar ou remover cargos
 * para membros do servidor.
 * 
 * @since 04/01/2019
 * @version 1.0
 * @author Lucas Samuel Kluser
 */

/**
 * Retorna o cargo de acordo com roleName passado via parâmetro
 * @param {string} roleName Nome do cargo
 * @param {*} roles Lista de cargos no servidor
 * @return Cargo encontrado ou nulo
 */
function findRole(roleName, roles) {
  return roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
}

module.exports = {
  /**
   * Adiciona um cargo para determinado membro do servidor
   * @param {string} roleName Nome do cargo
   * @param {*} member Membro do servidor
   * @param {*} guild Servidor
   */
  addRole(roleName, member, guild) {
    var role = findRole(roleName, guild.roles);
  
    member
      .addRole(role.id)
      .then(console.log(`${roleName} adicionado para ${member.user.username}`))
      .catch(err => console.log(err));
  },

  /**
   * Remove um cargo de determinado membro do servidor
   * @param {string} roleName Nome do cargo
   * @param {*} member Membro do servidor
   * @param {*} guild Servidor
   */
  removeRole(roleName, member, guild) {
    var role = findRole(roleName, guild.roles);
  
    member
      .removeRole(role.id)
      .then(console.log(`${roleName} removido para ${member.user.username}`))
      .catch(err => console.log(err));
  }
}