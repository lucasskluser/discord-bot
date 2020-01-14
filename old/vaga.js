const database = require('../core/databaseManager');

module.exports = (client, message) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;

    const date = new Date();

    const data = {
        autor: message.author.id,
        data: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        prazo: '10m',
        plataforma: 'pc',
        dificuldade: 'gm3',
        disponiveis: 3,
        ocupadas: 1
    };

    message.channel.send(`\`${JSON.stringify(data)}\``);

    // const ref = `Servidores/${message.guild.id}/Vagas/${message.author.id}/${message.author.id.toString().substring(0, 7) + Math.floor(Math.random() * 10000).toString()}`;
    // database.ref(ref).once('value').then(async function(snap) {
    //     if (snap.val() === null) {
    //         database.ref(ref).set({
    //             autor: message.author.id,
    //             data: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    //             prazo: '10m',
    //             plataforma: 'pc',
    //             dificuldade: 'gm3',
    //             disponiveis: 3,
    //             ocupadas: 1
    //         })
    //     }
    // })
}