const fs = require('fs');
// Путь к директории, где вы хотите получить список папок
const directoryPath = '../novels';

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