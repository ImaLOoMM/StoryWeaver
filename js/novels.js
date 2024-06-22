// Модуль вызывается для скаченных новелл.

const fs = require('fs');
const directoryPath = '../novels'; // Путь к директории, где нужно получить список папок

// Чтение содержимого директории
fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.error('Ошибка чтения директории:', err);
        return;
    }

    // Фильтрация только папок
    const directories = files.filter(file => file.isDirectory()).map(file => file.name);

    console.log('Папки в текущей директории:', directories);
});