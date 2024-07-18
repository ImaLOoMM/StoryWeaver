const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const RPC = require("discord-rpc");
const DOMPurify = require('dompurify')(window);


// Загрузка дискорда
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
    if (!values["details"]) {
        values["details"] = "а у него бетка :P" // НЕ ЗАБУДЬ УБРАТЬ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }

    const filteredValues = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== "")
    ); // Убрать ключи со значениями ""

    rpc.setActivity(filteredValues);
}


rpc.on('ready', () => {
    console.log('[discord-rpc]: Discord activity has been added'); // Первый запуск
});
  
rpc.login({ clientId }).catch(console.warn);


function UpdatingActivity(details) {
    setInterval(() => {
        setActivity({ details: details });
        console.log("[discord-rpc]: Discord activity has been updated");
    }, 3e3); // Обновление каждые 3 секунды
}





contextBridge.exposeInMainWorld('api', {
  readFile: (filePath) => fs.readFileSync(filePath, 'utf-8'),
  pathJoin: (...args) => path.join(...args),
  readdir: (srcPath, options, callback) => { return fs.readdir(srcPath, options, callback) },
  readFileSync: (filePath) => fs.readFileSync(filePath, 'utf-8'),
  IsDir: (arg) => { return fs.statSync(arg).isDirectory(); },
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  sanitize: (textContent) => {
    return DOMPurify.sanitize(textContent, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'i', 'b', 'u', 's', 'span', 'small', 'big', 'mark', 'sub', 'sup', 'abbr'],
    ALLOWED_ATTR: ['color', 'lang', 'dir', 'id', 'class', 'title']
    });},
  on: (channel, listener) => ipcRenderer.on(channel, listener),
  UpdatingActivity: (details) => UpdatingActivity(details)
});