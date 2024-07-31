import { one_ctl } from '../one_ctl.js';
const { mathEvaluate } = window.api;


export function variablesToValues(expression, variableScope) {
    // В строке-выражении заменяет переменные на их значения
    return expression.replace(/\${([a-zA-Z_$][0-9a-zA-Z_$]*)}/g, (match, variableName) => {
        if (variableScope.hasOwnProperty(variableName)) {
            return variableScope[variableName]["value"];
        } else {
            throw new Error(`"${variableName}" is not defined`);
        }
    });
}


export function safeEval(AlgExpression, variableScope) {
    let ClearExpression = variablesToValues(AlgExpression, variableScope);

    try {
        if (/^[0-9+\-*/^().\s]+$/.test(ClearExpression)) {
            return mathEvaluate(ClearExpression);
        } else {
            throw new Error('Invalid characters in expression');
        }
    } catch (e) {
        console.error('Error evaluating expression:', e.message);
        return null;
    }
}



export function create_variable({name=null, value=null, type=""}, raw_next, variableScope) {
    return new Promise((resolve, reject) => {
        const identifierRegex = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/; // шаблон имени переменной
        if (!identifierRegex.test(name)) { // если имя не соответствует шаблону
            console.error(`impossible to create a variable named ${name}`);
            return reject();
        }
        if (typeof(type) != "string") {
            console.error(`Type should be string`);
            return reject();
        }

        switch (type.toLowerCase()){
            case "number":
                type = "number"
                if (value == null) {
                    console.warn("The number type cannot have a null value. The value is set to 0")
                    value = 0;
                }
                if (value == "NaN"){
                    console.warn('The NaN value cannot be set. The value is set to 0');
                    value = 0;
                } else if (parseFloat(value) != value) {
                    console.warn('Invalid characters in value. The value is set to 0');
                    value = 0;
                }
                break;
            case "string":
                type = "string"
                break;
            default:
                console.log(null);
                break;
            
            }
            
        variableScope[name] = {"value": value, "type": type};
        console.log(variableScope);
        return resolve(one_ctl(raw_next));
    });
}

export function variable({name=null, value=null}, raw_next) {
    return new Promise((resolve, reject) => {
        switch (variableScope[name]["type"]) {
            case "number":
                variableScope[name]["value"] = safeEval(value, variableScope);
                break;
            case "string":
                variableScope[name]["value"] = variablesToValues(value, variableScope);
                break;
            default:
                // потом
                break;
        }
        return resolve(one_ctl(raw_next));
    });
}