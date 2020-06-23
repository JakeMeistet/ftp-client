const Client = require('ftp')
const readLine = require('readline-sync')

var host = readLine.question('Enter the hostname/ip of your FTP server: ')
var port = readLine.questionInt('Enter the port (if 21, leave blank): ')
var user = readLine.question('Enter your username for the server:')
var password = readLine.question('Enter your password for the server:')
var tls = readLine.question('Does the FTP server use TLS/SSL encryption? Y/n')
var tlsbool

function details () {


    if (tls = 'Y','y') {
        tlsbool = true
    } else {
        tlsbool = false
    }
}

var client = new Client();
client.on('ready', function() {
    client.list((err, list) => {
        if (err) throw err;
        console.dir(list);
        client.end();
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