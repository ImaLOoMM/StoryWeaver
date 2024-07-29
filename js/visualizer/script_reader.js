window.Variables = {};

import { await_click, await_time } from './user_funcions/awaits.js'; // Awaits
import { fill } from './user_funcions/colors.js'; // Styles
import { text } from './user_funcions/add.js'; // Text
import { create_variable, variable } from './user_funcions/manage_variable.js'; // Vars

const functionMap = {
    "fill": fill,
    "await-click": await_click,
    "await-time": await_time,
    "text": text,
    "create-variable": create_variable,
    "variable": variable,
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
    while (true){
        element ++;
        
        const [funcname, kwargs, raw_next] = script[key];
        
        console.log({key: key, funcname: funcname, count: element, kwargs: kwargs});

        const next = await behavior_manager(funcname, kwargs, raw_next);
        
        console.log(`[${raw_next}] ⟶ ${next}`);
        if (next in script){
            key = next
        } else {
            console.log("end");
            return;
        }
        
    }
}


function distributor(script) {
    let defaults = script["defaults"];
    let imports = script["imports"];
    let functions = script["functions"];
    let listeners = script["listeners"];
    let mainScript = script["main"];

    read(mainScript);
}

fetch("behavior.json") // Загружает файл JSON
    .then(response => {
        // Обработка HTTP-ответа
        return response.json(); // Преобразет ответ в JSON и передаёт дальше
    })
    .then(data => {
        distributor(data)
    })
    .catch(error => {
        // Обработка ошибок
        console.error('Ошибка загрузки файла:', error);
});