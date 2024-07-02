const { ipcRenderer } = require('electron');


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


// // Проходимся по всем найденным кнопкам и добавляем атрибут tabindex="-1"
// var buttons = document.querySelectorAll('button');
// buttons.forEach(function(button) {
//     button.setAttribute('tabindex', '-1');
// });


window.addEventListener('keydown', (event) => {
    // Check if Ctrl (Cmd on macOS) + F5 was pressed
    if ((event.ctrlKey || event.metaKey) && event.key === 'F5') {
        // Reload the current page
        window.location.reload(true); // true параметр для полной перезагрузки страницы с сервера
    }
    if (((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === '+') || ((event.ctrlKey || event.metaKey) && event.key === '-')) {
        event.preventDefault();
    }
});