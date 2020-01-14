module.exports = (client) => {
    console.log(`Logado como ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('Anthem™');
}