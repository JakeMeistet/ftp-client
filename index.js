const Client = require('ftp')
const readLine = require('readline-sync')
const fs = require('fs')

var host = readLine.question('Enter the hostname/ip of your FTP server: ')
var port = readLine.question('Enter the port (if 21, leave blank): ')
var user = readLine.question("Enter your username for '" + host + "': ")
var password = readLine.question("Enter your password for '" + host + "': ")
var tls = readLine.question('Does the FTP server use TLS/SSL encryption? Y/n? ')
var tlsbool = false

function verify() {
    if (port = '') port = '21';
    if (tls = 'Y','y') tlsbool = true;
}

var client = new Client();
client.on('ready', function() {
    client.list((err, list) => {
        if (err) throw err;
        var dir = JSON.stringify(list)
        fs.writeFileSync('homeDir.json', dir, (err) => {if (err) throw err})
        const home = loadJSON();
        if (home[0].type === 'd') {
            var type = 'Directory'
        } else {
            type = home[0].type
        }
        console.log('Type: ' + type)
        console.log('Name: ' + home[0].name)  
        client.end();
    });
});

const loadJSON = () => {

    try {
        const readJSON = fs.readFileSync('homeDir.json', 'utf-8')
        var data = JSON.parse(readJSON)
        return data

    } catch (err) {
        return []
    }
}

client.connect({
    host: host,
    port: port,
    secure: true,
    secureOptions: {'rejectUnauthorized': tlsbool},
    user: user,
    password: password,
    connTimeout: 20000
})