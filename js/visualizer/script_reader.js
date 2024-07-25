import { await_click, await_time } from './../user_funcions/awaits.js'; // Awaits
import { fill } from './../user_funcions/colors.js'; // Awaits

import { text } from './../user_funcions/add.js'; // Text
const functionMap = {
    "fill": fill,
    "await-click": await_click,
    "await-time": await_time,
    "text": text
}

async function behavior_manager(func_name, func_kwargs, raw_next) {
    if (functionMap.hasOwnProperty(func_name)) {
        const func = functionMap[func_name];
        return await func(func_kwargs, raw_next);
    } else {
        throw new Error(`Unknown function name: ${func_name}`);
    }
}

async function read(script){
    let key = 0;
    let element = 0;
    // const len = Object.keys(script).length;
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

fetch("behavior.json") // Загружает файл JSON
    .then(response => {
        // Обработка HTTP-ответа
        return response.json(); // Преобразет ответ в JSON и передаёт дальше
    })
    .then(data => {
        read(data)
    })
    .then(() => {
        var overlay = document.getElementById("loading-window");
        if (overlay) {
            overlay.parentNode.removeChild(overlay);
        }
    })
    .catch(error => {
        // Обработка ошибок
        console.error('Ошибка загрузки файла:', error);
});