const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800, 
        height: 540,
        frame: false,
        icon: __dirname + "/img/swlogo.png"
    });

    win.setFullScreen(true); // Окно на весь экран

    win.webContents.on('before-input-event', (event, input) => {
        // Проверяем, является ли нажатая клавиша F11
        if (input.key === 'F11') {
            // Предотвращаем дальнейшее действие по умолчанию
            event.preventDefault();
        }
    });
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
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