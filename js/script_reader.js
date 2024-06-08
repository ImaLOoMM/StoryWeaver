const body = document.getElementById('main-body');
const loading_img = document.getElementById('loading-progress');


function fill({area = "content", text="", background=""}, raw_next){
    return new Promise((resolve, reject) => {
        let interaction_area = document.getElementById(area); // Определение области заливки
        if (!interaction_area){
            console.error("AttributeError: Uncnown area to fill:", area)
        }
        if (text){
            interaction_area.style.color = text;
        }
        if (background){
            interaction_area.style.backgroundColor = background;
        }
        if(raw_next.length > 1){
            console.warn("Too many links")
        }
         // Нет никаких вариаций, поэтому выбирается первый элемент во избежание ошибок
        resolve(raw_next[0])
    });
}

function await_click({where = "content"}, raw_next){
    return new Promise((resolve, reject) => {
         // Определение области ожидания клика
        target = document.getElementById(where);
        const onClick = () => {
             // После выхода из функции обработчик клика больше не пригодится. Удаляем
            target.removeEventListener('click', onClick);
             // Нет никаких вариаций, поэтому выбирается первый элемент во избежание ошибок
            if(raw_next.length > 1){ console.warn("Too many links") }
            resolve(raw_next[0]);
        };
         // обработчик клика
        target.addEventListener('click', onClick);
    });
}

function await_time({time = 1000}, raw_next) {
    // time in ms
    return new Promise((resolve) => {
        setTimeout(() => {
            if(raw_next.length > 1){ console.warn("Too many links") }
            resolve(raw_next[0]);;
        }, time);
    });
}

function text(kwargs = {}, raw_next){
    return new Promise((resolve, reject) => {
        const paragraph = document.getElementById("text");
        const { text_content = "", ...rest } = kwargs;
        paragraph.innerHTML = text_content;
        for (const [method, value] of Object.entries(rest)) {
            paragraph.style[method] = value;
        }
         // Нет никаких вариаций, поэтому выбирается первый элемент во избежание ошибок
        if (raw_next.length > 1){console.warn("Too many links") }
        resolve(raw_next[0]);
    });
}


async function behavior_manager(func_name, func_kwargs, raw_next) {
    let next;
    switch (func_name) {
        case "fill":
            next = await fill(func_kwargs, raw_next);
            break;
        case "await-click":
            next = await await_click(func_kwargs, raw_next);
            break;
        case "await-time":
            next = await await_time(func_kwargs, raw_next);
            break;
        case "text":
            next = await text(func_kwargs, raw_next);
            break;
        
        default:
            throw new Error(`Unknown function name: ${func_name}`);
    }
    return next;
}


async function read(script){
    let key = 0;
    let len = Object.keys(script).length;
    let element = 0;
    console.log(len)
    while (true){
        element ++;
        console.log(element)

        const [funcname, kwargs, raw_next] = script[key]

        next = await behavior_manager(funcname, kwargs, raw_next);

        // console.log(key); 
        
        console.log(funcname);
        console.log(kwargs);
        console.log(raw_next, next);
        if (next in script){
            key = next
        } else {
            console.log("end");
            return;
        }
        
    }
}

fetch("novels/prototype_v1/behavior.json") // Загружаем файл JSON
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