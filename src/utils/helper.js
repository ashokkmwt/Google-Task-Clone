const deepCopy = (value) => {
    return JSON.parse(JSON.stringify(value))
}


export {
    deepCopy
}