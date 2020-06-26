module.exports.linearSearch = (search, directory) => {
    var exists = false
    for (i = 0; i <= length(search) - 1; i++) {
        if (search[i] === directory) {
            exists = true
            break;
        }
    }
    return exists

}

function length(obj) { // Funciton length used to return the length of 
    return Object.keys(obj).length;
}