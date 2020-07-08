// Imports required packages for FTP client
const ftp = require('basic-ftp')
const readLine = require('readline-sync')
const commands = require('./src/commands')

// const login = () => {
        // Relevant information e.g. hostname/ip, port and username gathered from the user and stored in the relevant variables
var host = readLine.question('Enter the hostname/ip of your FTP server: ')
var port = readLine.questionInt('Enter the port: ')
var user = readLine.question("Enter your username for '" + host + "': ")
var password = readLine.question("Enter your password for '" + host + "': ")
var tls = readLine.question('Does the FTP server use TLS/SSL encryption? Y/n? ')
newClient()
// }

// New client instance for connection to FTP Server
async function newClient() {
    
    var currentDirStr = '/'

    if (tls = 'Y','y') {
        var tlsbool = true
    }else {
        var tlsbool = false
    };

    const client = new ftp.Client();
    client.ftp.verbose = true
        
    await client.access({
        host: host,
        port: port,
        user: user,
        password: password,
        secure: tlsbool,
        secureOptions: {rejectUnauthorized:false}
    })

    var listing = await client.list()
    let currentDir = {}
    currentDir = listing
    var terminate = false

    do {
        //console.log(`Current direcory: ${currentDir}`);
        console.log("Available actions: 'cd <directory>', 'mkdir', ....., 'end'")
        var action = readLine.question('Action: ')
        
        var actionBreakdown = action.split(' ')
        console.log(actionBreakdown[1])

        switch (actionBreakdown[0].toLowerCase()) {
            case 'cd':   
                var currentDirStr = await commands.cd(actionBreakdown, currentDirStr, currentDir)
                currentDir = await client.list(currentDirStr)
                await client.cd(currentDirStr)
                break;

            case 'dl':
                commands.dl(actionBreakdown, currentDirStr, currentDir, client)    
                break;
                
            case 'end':
                terminate = true
                break;
            } 
    }
    while(terminate === false);
    await client.close()
}
