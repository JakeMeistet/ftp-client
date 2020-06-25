const fs = require('fs');
const { fileURLToPath } = require('url');

module.exports.getListing = (currentDir) => { // Get Listing function used to 

    const home = loadJSON(currentDir); // Takes currentDir variable and passes it through loadJSON function
    var i
    let listing = [] // Array used to store directory details which are later logged and returned
    console.log('Directiory name: ..')
    console.log('Directiory name: .')
    console.log('Directiory name: /')
    for (i = 0; i <= length(home)-1; i++) { // Repeats checks for type e.g. directory, file etc
      
        listing[i,1] = home[i].name
        if (home[i].type === 'd') {
            listing[i,0] = 'Directory'
        } else if (home[i].type === '-') {
            listing[i,0] = 'File'
        } else {
            listing[i,0] = home[i,0]
        }
        console.log(listing[i,0] + ' name: ' + listing[i,1]) // Logs data on FTP server in console for user to see directories/files etc
    }
    return listing // Array 'listing' returned to be used outsider of direcotories.js
}

function length(obj) { // Funciton length used to return the length of 
    return Object.keys(obj).length;
}

const loadJSON = (currentDir) => {
    try {
        return JSON.parse(fs.readFileSync(currentDir, 'utf-8'))
    } catch (err) {
        return []
    }
}
