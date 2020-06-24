const fs = require('fs');
const { fileURLToPath } = require('url');

const getListing =(currentDir) => { // Get Listing function used to 

    const home = loadJSON(currentDir); // Takes currentDir variable and passes it through loadJSON function
    var i
    let listing = [] // Array used to store directory details which are later logged and returned
    for (i = 0; i <= length(home)-1; i++) { 
        listing[i,1] = home[i].name
        if (home[i].type === 'd') {
            listing[i,0] = 'Directory'
        } else {
            listing[i,0] = home[i].type
        }
        console.log(listing[i,0] + ' name: ' + listing[i,1])
    }
    return listing
}

function length(currentDir) {
    return Object.keys(currentDir).length;
}

const loadJSON = (currentDir) => {   

    try {
        const readJSON = fs.readFileSync(currentDir, 'utf-8')
        var data = JSON.parse(readJSON)
        return data

    } catch (err) {
        return []
    }
}

module.exports = {
    getListing: getListing
}