const linearSearch = (search, directory) => {
    let existsArr = []
    existsArr[0] = false
    //var exists = false
    for (i = 0; i <= length(search) - 1; i++) {
        if (search[i] === directory) {
            existsArr[0] = true
            existsArr[1] = i
            break;
        }
    }
    return existsArr
}

const length = (obj) => { // Funciton length used to return the length of 
    return Object.keys(obj).length;
}

module.exports = {
    linearSearch:linearSearch,
    length:length
}