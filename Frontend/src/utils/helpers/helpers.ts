// select value handler
export const selectValueHandler = (value: string) => {
    return value.split(" ").join("").toLowerCase()
}

//save objects to local storage
export const saveToLocalStorage = (key: string, value: any) => {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue)
}

// retrieve saved objects from localStorage
export const loadFromLocalStorage = (key: string) => {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue !== null) {
        return JSON.parse(serializedValue)
    }
    return undefined;
}

//random number generator
export const randomId = () => {
    const min = 10000;
    const max = 99999
    const randomNum = Math.floor(max * Math.random()) + min;
    return randomNum
}