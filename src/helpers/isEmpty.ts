function isStringEmpty(string?: string): boolean {
    return string == null || string === ''
}

function isArrayEmpty(array?: any[] | null | undefined):boolean {
    return array == null || array.length < 1
}

export {
    isArrayEmpty, isStringEmpty
}