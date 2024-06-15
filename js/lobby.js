// Находим кнопку по её id
const button = document.getElementById('start');

// Добавляем обработчик события click на кнопку
button.addEventListener('click', function() {
    // Перенаправляем пользователя на указанный URL
    window.location.href = 'novels/prototype_v1/start.html';
});