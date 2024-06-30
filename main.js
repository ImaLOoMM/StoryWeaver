const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('path');
const url = require('url');
const tmp = require('tmp');
const fs = require('fs');

let win;
let tmpFile;

function createWindow() {
    win = new BrowserWindow({
        width: 800, 
        height: 540,
        frame: false,
        icon: __dirname + "/img/logo/swlogo.png",
        webPreferences: {
            nodeIntegration: true, // Разрешение на использование node.js API в рендер процессах
            contextIsolation: false, // Включение доступа к DOM API в рендер процессах
            enableRemoteModule: true, // Разрешение на использование remote модуля в рендер процессах
            sandbox: false, // Отключение песочницы для полного доступа к API Node.js
            webSecurity: true, // Включение веб-безопасности
            allowRunningInsecureContent: false, // Запрещение запуска небезопасного контента
            worldSafeExecuteJavaScript: true, // Включение безопасного выполнения JavaScript
            contextBridge: true, // Включение context bridge для безопасного взаимодействия с API между процессами
            additionalArguments: ['--disable-http-cache'] // Отключение HTTP кэширования
        }
    });

    win.setFullScreen(true); // Окно на весь экран

    win.loadFile('index.html');

    win.webContents.on('before-input-event', (event, input) => {
        // Проверяем, является ли нажатая клавиша F11
        if (input.key === 'F11') {
            // Предотвращаем дальнейшее действие по умолчанию
            event.preventDefault();
        }
        // Отключить возможность заново открыть панель разработчика
        // if (input.control && input.shift && input.key.toLowerCase() === 'i') {
        //     event.preventDefault();
        // }
    });
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    // win.webContents.openDevTools(); // DevTools

    win.on('closed', () => {
        win = null;
    });
}

// App ready event
app.on('ready', () => {
    createWindow()
    const startTime = Date.now();
    tmpFile = tmp.fileSync({ keep: true, postfix: '.txt' });
    console.log('Temporary file created at:', tmpFile.name);

    fs.writeFileSync(tmpFile.name, `${startTime}`);
});

// App window-all-closed event
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        tmpFile.removeCallback();
        console.log('Temporary file deleted');
        console.log("app was closed")
        app.quit();
    }
});

// App activate event
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('get-temp-file-path', () => {
    return tmpFile.name;
});