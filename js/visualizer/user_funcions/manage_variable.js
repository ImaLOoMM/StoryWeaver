import { one_ctl } from '../one_ctl.js';
const { mathEvaluate } = window.api;


function replaceVariables(expression) {
    return expression.replace(/\!([a-zA-Z_$][0-9a-zA-Z_$]*)/g, (match, variableName) => {
        // if (window.Variables.hasOwnProperty(variableName)) {
        //     return window.Variables[variableName];
        // } else {
        //     throw new Error(`Variable ${variableName} is not defined in Variables`);
        // }
        return window.Variables[variableName]["value"];
    });
}


function safeEval(AlgExpression) {
    let ClearExpression = replaceVariables(AlgExpression);

    try {
        if (/^[0-9+\-*/^().\s]+$/.test(ClearExpression)) {
            mathEvaluate("1+1");
            mathEvaluate("1*1");
            mathEvaluate("1^1");
            mathEvaluate("1^1.1");
            
            return mathEvaluate(ClearExpression);
        } else {
            throw new Error('Invalid characters in expression');
        }
    } catch (e) {
        console.error('Error evaluating expression:', e.message);
        return null;
    }
}



export function create_variable({name=null, value=null, type=""}, raw_next) {
    return new Promise((resolve, reject) => {
        const identifierRegex = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/; // шаблон имени переменной
        if (!identifierRegex.test(name)) { // если имя не соответствует шаблону
            console.error(`impossible to create a variable named ${name}`);
            return reject();
        }
        if (typeof(type) == "string") {
            type = type.toLowerCase();
        } else {
            console.error(`Type should be string`);
            return reject();
        }

        switch (type.toLowerCase()){
            case "int" || "integer":
                console.log(1);
                break;
            case "str" || "string":
                console.log("a");
                break;
            default:
                console.log("null");
                break;
        }

        window.Variables[name] = {"value": value, "type": type};
        console.log(window.Variables);
        return resolve(one_ctl(raw_next));
    });
}

export function variable({name=null, value=null}, raw_next) {
    return new Promise((resolve, reject) => {
        switch (window.Variables[name]["type"]) {
            case "int" || "integer":
                window.Variables[name]["value"] = safeEval(value);
                break;
            default:
                console.log("потом")
                break;
        }
        return resolve(one_ctl(raw_next));
    });
}