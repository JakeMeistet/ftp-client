const directories = require('./directories')
const fs = require('fs')
const readLine = require('readline-sync')

const cd = (client, currentDir) => {
    directories.getListing(currentDir)  
    var directory = readLine.question('Enter the directory listed above:')      
    client.list(directory, (err, list) => {
        if (err) throw err
        var dir = JSON.stringify(list)       
        fs.writeFileSync('./src/currentDir.json', dir, (err) => {if (err) throw err})
        currentDir = './src/currentDir.json'
        directories.getListing(currentDir) 
        //console.log(currentDir)                                    
    });
    return currentDir
}

module.exports = {
    cd:cd
}