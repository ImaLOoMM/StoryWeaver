import { path } from 'path';
import { format } from 'url';
import { app, BrowserWindow } from 'electron';
// const path = require('path');
// const url = require('url');
// const {app, BrowserWindow} = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800, 
        height: 540,
        frame: false,
        icon: __dirname + "/img/logo/swlogo.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
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
    });
    
    win.loadURL(format({
        pathname: join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.webContents.openDevTools(); // Dev Tools

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