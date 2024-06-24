const RPC = require('discord-rpc');
const startTime = Date.now();
const clientId = '1254071814897008691'; // Client ID
const rpc = new RPC.Client({ transport: 'ipc' });
RPC.register(clientId);


rpc.on('ready', () => {
    console.log('[discord-rpc]: Discord status has been changed'); // Первый запуск
  
    setActivity({details: "Сидит в лобби", state: "Только что"});
    // UpdatingActivity(startTime);
});
  
rpc.login({ clientId }).catch(console.error);

function setActivity(values = {details: "", state: "", smallImageKey: ""}) {
    values["largeImageKey"] = "swlogo-1024"; // Большое изображение не меняется

    const filteredValues = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== "")
    ); // Убрать ключи со значениями ""

    rpc.setActivity(filteredValues);
}


function UpdatingActivity(details, startTime) {
    setInterval(() => {
    
    const now = Date.now();
    const elapsed = now - startTime;

    let state; // Удобное изменение времени.
    const minutes = Math.floor(elapsed / 60000);
    const hours = Math.floor(elapsed / 3600000);
    const days = Math.floor(elapsed / 86400000);

    // Правильные формы единиц измерения времени
    if (days > 0) {
        state = `уже ${days} ${days === 1 ? 'день' : (days % 10 === 1 && days % 100 !== 11) ? 'день' : (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)) ? 'дня' : 'дней'}`;
    } else if (hours > 0) {
        state = `уже ${hours} ${hours === 1 ? 'час' : (hours % 10 === 1 && hours % 100 !== 11) ? 'час' : (hours % 10 >= 2 && hours % 10 <= 4 && (hours % 100 < 10 || hours % 100 >= 20)) ? 'часа' : 'часов'}`;
    } else {
        state = `уже ${minutes} ${minutes === 1 ? 'минуту' : (minutes % 10 === 1 && minutes % 100 !== 11) ? 'минуту' : (minutes % 10 >= 2 && minutes % 10 <= 4 && (minutes % 100 < 10 || minutes % 100 >= 20)) ? 'минуты' : 'минут'}`;
    }

    setActivity({details: details, state: state});
    console.log("[discored-rpc]: Activity has been updated")
    }, 60e3); // обновление каждую минуту
}

module.exports = {
    startTime,
    UpdatingActivity
  };