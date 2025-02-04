const normalizeVariableName = (str:string):string => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/(\s|\.)+/g, '');
}

export const normalizeKeys = (data:any):any => {
    const out:any = {}
    for (var key of Object.keys(data)) {
        out[normalizeVariableName(key)] = data[key]
    }
    return out
}