const body = document.getElementById('main-body');
let bodyBg = body.style.backgroundColor


function read(script){
    let key = 0;
    while (true){
        const [funcname, kwargs, next] = script[key]
        // console.log(key); 
        // console.log(funcname);
        // console.log(kwargs);
        // console.log(next);
        if (next in script){
            key = next
        } else {
            console.log("end");
            return 0;
        }
    }
}

fetch('novels/50.json') // Загружаем файл JSON
    .then(response => {
        // Обработка HTTP-ответа
        return response.json(); // Преобразуем ответ в JSON и передаем дальше
    })
    .then(data => {
        read(data)
    })
    .then(() => {
        var overlay = document.getElementById("loading-window");
        if (overlay) {
            overlay.parentNode.removeChild(overlay);
        }
    }

    )
    .catch(error => {
        // Обработка ошибок
        console.error('Ошибка загрузки файла:', error);
    });