window.UserFunctions = {};


export function init_functions(functions) {
    for (let func_name of Object.keys(functions)) {
        window.UserFunctions[func_name] = functions[func_name]
    }
}