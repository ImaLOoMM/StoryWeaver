document.addEventListener('DOMContentLoaded', function () {
    const panel_btn = document.getElementById('panel_button');
    const panel = document.getElementById('panel');
    const oc_arrow = document.getElementById('oc_arrow');
    const action_area = document.getElementById("everywhere");
    // const content = document.getElementById('content')
    let is_options_panel_opened = false;

    panel_btn.addEventListener('click', function () {
        if (is_options_panel_opened){
            /*Закрыть окно*/
            var elements = document.querySelectorAll('#everywhere *');
                elements.forEach(function(element) {
                    element.style.filter = "";
            });

            panel.style.left = '-20%';
            panel_btn.style.left = '0%'
            oc_arrow.classList.remove('left-arrow');
            is_options_panel_opened = false;
        } else {
            // content.style.filter = "blur(10px)"
            var elements = document.querySelectorAll('#everywhere *');
                elements.forEach(function(element) {
                    element.style.filter = "blur(5px)";
            });
            
            panel.style.left = '0px';
            panel_btn.style.left = '20%'
            oc_arrow.classList.add('left-arrow');
            is_options_panel_opened = true;
        }
        setTimeout(function () {
            panel_btn.disabled = false;
        }, 300);
    });

    // hideButton.addEventListener('click', function () {
    //     panel.style.left = '-200px';
    // });
});

var buttons = document.querySelectorAll('button');

// Проходимся по всем найденным кнопкам и добавляем атрибут tabindex="-1"
buttons.forEach(function(button) {
    button.setAttribute('tabindex', '-1');
});



document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && event.target.href) {
      const url = new URL(event.target.href);
      if (url.origin === window.location.origin) {
        // Проверяем, что ссылка ведёт на текущий origin (внутренняя ссылка)
        event.preventDefault(); // Предотвращаем переход по ссылке
        // Ваша логика обработки перехода по внутренней ссылке
        console.log('Переход по внутренней ссылке:', event.target.href);
        // Например, загрузка нового содержимого на страницу
        fetch(url.href)
          .then(response => response.text())
          .then(html => {
            document.body.innerHTML = html;
          })
          .catch(error => {
            console.error('Ошибка загрузки:', error);
          });
      } else {
        // Внешняя ссылка, запрещаем переход
        event.preventDefault();
        console.error('Отказано в попытке открыть внешнюю ссылку:', event.target.href);
      }
    }
  });

