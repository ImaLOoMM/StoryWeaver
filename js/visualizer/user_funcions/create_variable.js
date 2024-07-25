import { one_ctl } from '../one_ctl.js';

export function create_variable({name="", value="", type=""}, raw_next) {
    return new Promise((resolve, reject) => {
        const identifierRegex = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
        if (identifierRegex.test(name)) {
            window.Variables[name] = value;
            console.log(window.Variables);
            return resolve(one_ctl(raw_next));
        } else {
            console.error(`impossible to create a variable named ${name}`);
            return reject();
        }
    });
}