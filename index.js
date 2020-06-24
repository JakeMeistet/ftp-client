// Imports required packages for FTP client
const Client = require('ftp')
const readLine = require('readline-sync')
const fs = require('fs')
const directories = require('./src/directories') // Imports directories.js file to for handling of JSON files 

// Relevant information e.g. hostname/ip, port and username gathered from the user and stored in the relevant variables
var host = readLine.question('Enter the hostname/ip of your FTP server: ')
var port = readLine.question('Enter the port (if 21, leave blank): ')
var user = readLine.question("Enter your username for '" + host + "': ")
var password = readLine.question("Enter your password for '" + host + "': ")
var tls = readLine.question('Does the FTP server use TLS/SSL encryption? Y/n? ')
var tlsbool = false // Used to convert var 'tls' into a boolean attribute to determine whether the server uses TLS/SSL
var currentDir = './src/homeDir.json'   

// Verify function used to set default port (if blank) and take the tls string value and set the tlsbool boolean value
function verify() {
    if (port = '') port = '21';
    if (tls = 'Y','y') tlsbool = true;
}
// New client instance for connection to FTP Server
var client = new Client();
client.on('ready', function() {
    // Retrieves directory listing of home directory
    client.list((err, list) => {
        if (err) throw err;
        var dir = JSON.stringify(list) // Takes directory listing and converts the to string and assigns it to var 'dir'
        fs.writeFileSync('./src/homeDir.json', dir, (err) => {if (err) throw err}) // Creates(or overwrites) homeDir.json file and writes var 'dir' to the file    
    });

    var terminate = false
    while (terminate === false) {
        console.log("Available actions: 'cd', 'mkdir', ....., 'end'")
        var action = readLine.question('Action: ')
        console.log(action.toLowerCase())
        
        switch (action.toLowerCase()) {
            case 'cd':               
                directories.getListing(currentDir)  
                var directory = readLine.question('Enter the directory listed above:')      
                client.list(directory, (err, list) => {
                    if (err) throw err
                    var dir = JSON.stringify(list)       
                    fs.writeFileSync('./currentDir.json', dir, (err) => {if (err) throw err})
                    currentDir = './currentDir.json'
                    directories.getListing(currentDir) 
                    console.log(currentDir)                              
                });
                console.log(currentDir)
                break;
            case 'end':
                terminate = true 
                break; 
            }
    }
    client.end()

    
});


// Connects the client session to the specific FTP/FTPS server
client.connect({
    host: host,
    port: port,
    secure: true,
    secureOptions: {'rejectUnauthorized': tlsbool},
    user: user,
    password: password,
    connTimeout: 20000
})