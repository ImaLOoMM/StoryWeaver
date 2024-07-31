window.EnvVariables = {};
window.Variables = {};
window.FunctionalLocalVariables = {};

import { await_click, await_time } from './user_funcions/awaits.js'; // Awaits
import { fill } from './user_funcions/colors.js'; // Styles
import { text } from './user_funcions/add.js'; // Text
import { create_variable, variable, variablesToValues } from './user_funcions/manage_variable.js'; // Vars
import { init_functions } from "./functions.js"

let defaults;
let imports;
let functions;
let listeners;
let mainScript;


async function user_func({func_name=null, args={}, optargs={}}, raw_next) {
    return new Promise(async (resolve) => {
        if (window.UserFunctions.hasOwnProperty(func_name)) {
            console.info("Entered into function", func_name);
            let availableArguments = {};
            for (let arg_name of Object.keys(args)) {
                availableArguments[arg_name] = variablesToValues(args[arg_name], window.Variables);
            }
            for (let arg_name of Object.keys(optargs)) {
                availableArguments[arg_name] = variablesToValues(optargs[arg_name], window.Variables);
            }
            let script = window.UserFunctions[func_name].algorithm
            let key = 0;
            let element = 0;
            while (true){
                element ++;
                
                const [funcname, kwargs, raw_next] = script[key];
                
                console.log({key: key, funcname: funcname, count: element, kwargs: kwargs});
                
                if (func_name != "return") {
                    const next = await behavior_manager(funcname, kwargs, raw_next, availableArguments);
                    console.log(`[${raw_next}] ⟶ ${next}`);
                    if (next in script){
                        key = next
                    } else {
                        console.log("end of function");
                        console.warn("function doesn't has return part");
                        resolve(null);
                    }
                } else {
                    console.log(variablesToValues(kwargs["value"]))
                    resolve(variablesToValues(kwargs["value"]))
                }
            }
        } else {
            console.error(`Function ${func_name} is not defined. Null was returned`)
            resolve(null);
        }
    });
}


const functionMap = {
    "fill": fill,
    "await-click": await_click,
    "await-time": await_time,
    "text": text,
    "user-func": user_func,
}

const specialFunctionMap = {
    "create-variable": create_variable,
    "variable": variable,
}


async function behavior_manager(func_name, func_kwargs, raw_next, variableScope = window.Variables) {
    if (functionMap.hasOwnProperty(func_name)) {
        const func = functionMap[func_name];
        return await func(func_kwargs, raw_next);
    } else if (specialFunctionMap.hasOwnProperty(func_name)) {
        const func = specialFunctionMap[func_name];
        return await func(func_kwargs, raw_next, variableScope);
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
    try {
        defaults = script["defaults"];
        imports = script["imports"];
        functions = script["functions"];
        listeners = script["listeners"];
        mainScript = script["main"];

        init_functions(functions);
        read(mainScript);

    } catch(e) {
        console.error(e)
    }
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