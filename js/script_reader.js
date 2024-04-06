const body = document.getElementById('main-body');
const loading_img = document.getElementById('loading-progress');


function play_gif(frame) {
    const image = document.getElementById('loading-progress');
    const randomNumber = Math.floor(Math.random() * 1000000);
    const newSrc = "img/loading/frame_" + frame + ".png" + '?random=' + randomNumber;
    image.src = newSrc;
}


function read(script){
    let key = 0;
    let len = Object.keys(script).length;
    let element = 0;
    let progress = 0;
    console.log(len)
    while (true){
        element ++;
        if (progress != Math.round(element/len*100)){
            progress = Math.round(element/len*100)
            console.log(progress + "%")
        }

        const [funcname, kwargs, next] = script[key]
        // console.log(key); 
        // console.log(funcname);
        // console.log(kwargs);
        // console.log(next);
        if (next in script){
            key = next
        } else {
            console.log("end");
            return;
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