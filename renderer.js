document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && event.target.href) {
      const url = new URL(event.target.href);
      if (url.origin === window.location.origin) {
        console.log('Переход по внутренней ссылке:', event.target.href);
      } else {
        // Внешняя ссылка, запрещаем переход
        event.preventDefault();
        console.error('Отказано в попытке открыть внешнюю ссылку:', event.target.href);
      }
    }
});

var buttons = document.querySelectorAll('button');

// Проходимся по всем найденным кнопкам и добавляем атрибут tabindex="-1"
buttons.forEach(function(button) {
    button.setAttribute('tabindex', '-1');
});