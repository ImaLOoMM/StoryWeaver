const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');

let win;

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

    win.webContents.openDevTools(); // DevTools

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});