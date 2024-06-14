import { await_click, await_time } from './user_funcions/awaits.js'; // Awaits
import { fill } from './user_funcions/colors.js'; // Awaits
import { text } from './user_funcions/add.js'; // Awaits

// const body = document.getElementById('main-body');
// const loading_img = document.getElementById('loading-progress');


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
    let element = 0;
    // const len = Object.keys(script).length;
    // console.log(len)
    while (true){
        element ++;
        console.log(element + " {");
        
        const [funcname, kwargs, raw_next] = script[key];
        
        console.log(funcname);
        console.log(key);
        console.log(kwargs);

        const next = await behavior_manager(funcname, kwargs, raw_next);
        
        
        console.log(raw_next);
        console.log(next + " }");
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