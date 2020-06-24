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
        var currentDir = './src/homeDir.json' 
        // const home = directories.loadJSON(currentDir); // Takes currentDir variable and passess it through loadJSON function in directories.js and sets returned value as home const
        let listing = directories.getListing(currentDir)

        // if (home[0].type === 'd') {
        //     var type = 'Directory'
        // } else {
        //     type = home[0].type
        // }


        var terminate = false
        while(terminate = false) {

        }
        //client.end();
    });
});




client.connect({
    host: host,
    port: port,
    secure: true,
    secureOptions: {'rejectUnauthorized': tlsbool},
    user: user,
    password: password,
    connTimeout: 20000
})