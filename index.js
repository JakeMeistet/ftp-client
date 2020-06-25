// Imports required packages for FTP client
const Client = require('ftp')
const readLine = require('readline-sync')
const fs = require('fs')
const directories = require('./src/directories') // Imports directories.js file to for handling of JSON files 
const commands = require('./src/commands')
const util = require('./src/util');

// Relevant information e.g. hostname/ip, port and username gathered from the user and stored in the relevant variables
var host = readLine.question('Enter the hostname/ip of your FTP server: ')
var port = readLine.question('Enter the port (if 21, leave blank): ')
var user = readLine.question("Enter your username for '" + host + "': ")
var password = readLine.question("Enter your password for '" + host + "': ")
// var tls = readLine.question('Does the FTP server use TLS/SSL encryption? Y/n? ')
var tlsbool = false // Used to convert var 'tls' into a boolean attribute to determine whether the server uses TLS/SSL
var currentDir = './src/homeDir.json'   

// Verify function used to set default port (if blank) and take the tls string value and set the tlsbool boolean value
// this wont work lol, == or === for equality
function verify() {
    if (port = '') port = '21';
    if (tls = 'Y','y') tlsbool = true;
}

// New client instance for connection to FTP Server
const client = new Client();
client.on('ready', async () => {
    // Retrieves directory listing of home directory
    console.log(`Client at ${client.options.host} connected`)

    client.list((err, list) => {
        if (err) { console.log (`An unexpected error occured ${err}`); throw err } 
        fs.writeFileSync('./src/homeDir.json', JSON.stringify(list, false, 2)) // Creates(or overwrites) homeDir.json file and writes var 'dir' to the file    
    })

    var terminate = false
    do {
        console.log(`Current direcory: ${currentDir}`);
        console.log("Available actions: 'cd', 'mkdir', ....., 'end'")
        var action = readLine.question('Action: ')
    
        switch (action.toLowerCase()) {
            case 'cd':   
                currentDir = await commands.cd(client, currentDir)
                break;
            case 'end':
                terminate = true
                break;
            } 
    }
    while(terminate === false);
    client.end()
});


// Connects the client session to the specific FTP/FTPS server
client.connect({
    host: host,
    port: port,
    //secure: true,
    //secureOptions: {'rejectUnauthorized': false},
    user: user,
    password: password,
    connTimeout: 20000
})
