const {lineReader} = window.api;

export async function swdata(){
    let data = await lineReader(`novels/${localStorage.startedNovel}/behavior.sw`);
    let blockList = splitArr(data);
    console.log(blockList);
    let functionList = [];
    blockList.forEach(functionBlock => {
        functionList.push(toTokens(functionBlock));
    })
    console.log(functionList);
    return functionList;
    
}

function splitArr(arr=[]){
    // ["1","2","","11","12", ""] => [["1", "2"], ["11", "12"]]
    let result = [];
    let temp = [];
    arr.forEach(str => {
        if (str) {
            temp.push(str)
        } else if (temp.length) {
            result.push(temp)
            temp = []
        }
    });
    if (temp.length) {
        result.push(temp);
    }
    return result;
}

function toTokens(functionBlock) {
    const ura = functionBlock[0];
    const func_name = functionBlock[1];
    const kwargsBlock = functionBlock.slice(2, -1);
    const raw_actl = functionBlock[functionBlock.length - 1];
    let actl;
    if (ura != parseInt(ura)) {
       throw Error(`URA must be a number, not ${ura}`);
    };
    if (!/^[a-z_][a-z_$0-9]*$/i.test(func_name)){
        throw Error(`In function names, only Latin letters (a-z, A-Z), digits (0-9) and underscores (_) are allowed. The function name must start with a letter or underscore`);
    };
    if (/^\[(\d+,)*\d+\]$/.test(raw_actl)){
        actl = "[1,777777678,8765]".match(/\d+/g)
                                         .map(str_num => parseInt(str_num))
    } else {
        throw Error(`${raw_actl} is not an Array. ACTL must be an Array`);
    }
    let kwargs = {};
    kwargsBlock.forEach(str => {
        const kwargRegEx = /^([a-zA-Z_$][a-zA-Z_$0-9]*):(.+)$/
        if (kwargRegEx.test(str)) {
            const match = str.match(kwargRegEx);
            const variable = match[1];
            const value = match[2];
            kwargs[variable] = value;
            // kwargs[variable] = normalizeBackSlashes(value);
            if (value.includes("\\")) {
                document.getElementById("text").innerText = value;
                console.log(kwargs[variable], kwargs[variable].length)
            }
        } else {
            throw Error(`Invalid Syntax:\n${kwargs}`);
        }
    });
    return [ura, func_name, kwargs, actl];
}