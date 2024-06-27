const RPC = require('discord-rpc');
const fs = require('fs');
// const startTime = Date.now();
const clientId = '1254071814897008691'; // Client ID
const rpc = new RPC.Client({ transport: 'ipc' });


let startTime;

// Получение пути к временному файлу
async function getTempFilePath() {
    return await ipcRenderer.invoke('get-temp-file-path');
}

// Использование функции
getTempFilePath().then((path) => {
    console.log('Temporary file path:', path);

    // Чтение данных из временного файла
    try {
        startTime = parseInt(fs.readFileSync(path, 'utf-8'));
        console.log(new Date(startTime).toLocaleString());
    } catch (err) {
        console.error('Error reading the temporary file:', err);
    }

    rpc.login({ clientId }).catch(console.error);
});
// const startTime = Date.now();
RPC.register(clientId);


function time_representation() {  // Удобное изменение времени.
    const elapsed_time = Date.now() - startTime;
    let result;
    const minutes = Math.floor(elapsed_time / 60000);
    const hours = Math.floor(elapsed_time / 3600000);
    const days = Math.floor(elapsed_time / 86400000);

    // Правильные формы единиц измерения времени
    if (days > 0) {
        result = `Уже ${days} ${days === 1 ? 'день' : (days % 10 === 1 && days % 100 !== 11) ? 'день' : (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)) ? 'дня' : 'дней'}`;
    } else if (hours > 0) {
        result = `Уже ${hours} ${hours === 1 ? 'час' : (hours % 10 === 1 && hours % 100 !== 11) ? 'час' : (hours % 10 >= 2 && hours % 10 <= 4 && (hours % 100 < 10 || hours % 100 >= 20)) ? 'часа' : 'часов'}`;
    } else {
        if (minutes === 0) {
            result = "Только что"
        } else {
        result = `Уже ${minutes} ${minutes === 1 ? 'минуту' : (minutes % 10 === 1 && minutes % 100 !== 11) ? 'минуту' : (minutes % 10 >= 2 && minutes % 10 <= 4 && (minutes % 100 < 10 || minutes % 100 >= 20)) ? 'минуты' : 'минут'}`;
        }
    }
    return result;
}

function setActivity(values = {details: "", smallImageKey: ""}) {
    values["largeImageKey"] = "swlogo-1024"; // Большое изображение не меняется
    values["state"] = time_representation(); // Время обновляется само
    values["details"] = "а он с демкой :P" // НЕ ЗАБУДЬ УБРАТЬ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const filteredValues = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== "")
    ); // Убрать ключи со значениями ""

    rpc.setActivity(filteredValues);
}


rpc.on('ready', () => {
    console.log('[discord-rpc]: Discord activity has been added'); // Первый запуск
});
  
rpc.login({ clientId }).catch(console.error);


function UpdatingActivity(details) {
    setInterval(() => {
    setActivity({ details: details });
    console.log("[discored-rpc]: has been updated")
    }, 3e3); // обновление каждую минуту
}

module.exports = {
    UpdatingActivity, setActivity
};