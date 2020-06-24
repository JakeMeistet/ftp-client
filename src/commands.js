const directories = require('./directories')
const fs = require('fs')
const readLine = require('readline-sync')

const cd = () => {
    directories.getListing(currentDir)  
    var directory = readLine.question('Enter the directory listed above:')      
    client.list(directory, (err, list) => {
        if (err) throw err
        var dir = JSON.stringify(list)       
        fs.writeFileSync('./currentDir.json', dir, (err) => {if (err) throw err})
        currentDir = './currentDir.json'
        directories.getListing(currentDir)                                     
    });
    console.log(currentDir)
}