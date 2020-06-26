// Imports required packages for FTP client
const ftp = require('basic-ftp')
const readLine = require('readline-sync')
const fs = require('fs')
const processes = require('./src/processes')
const util = require('./src/util');
const { dir } = require('console')

newClient()

// New client instance for connection to FTP Server
async function newClient() {

    // Relevant information e.g. hostname/ip, port and username gathered from the user and stored in the relevant variables
    var host = readLine.question('Enter the hostname/ip of your FTP server: ')
    var port = readLine.questionInt('Enter the port: ')
    var user = readLine.question("Enter your username for '" + host + "': ")
    var password = readLine.question("Enter your password for '" + host + "': ")
    var tls = readLine.question('Does the FTP server use TLS/SSL encryption? Y/n? ')
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

    //if (err) { console.log (`An unexpected error occured ${err}`); throw err } 

    //fs.writeFileSync('./src/currentDir.json', JSON.stringify(listing, false, 2)) // Creates(or overwrites) homeDir.json file and writes var 'dir' to the file  
    //var currentDir = './src/currentDir.json'
    let currentDir = {}
    
    currentDir = listing
    var terminate = false
    do {
        //console.log(`Current direcory: ${currentDir}`);
        console.log("Available actions: 'cd', 'mkdir', ....., 'end'")
        var action = readLine.question('Action: ')
        
        switch (action.toLowerCase()) {
            case 'cd':   
                var directory = readLine.question('Enter the directory listed above:')
                if (directory === '/') {
                    currentDirStr = '/'
                } else if (directory === '../') {
                    var split = currentDirStr.split('/')
                    let splitArr = split
                    var len = length(split) - 1
                    for (i = 0; i <= len - 2; i++) {
                        if (splitArr[i] === '') splitArr[i] = '/'
                        currentDirStr = '' + splitArr[i]
                        console.log(currentDirStr)
                    }
                } else {
                    let search = []
                    for (i = 0; i <= length(currentDir) - 1; i++) {
                        search[i] = currentDir[i].name
                    }
                    var linear = processes.linearSearch(search, directory)
                    if (linear === true) currentDirStr = currentDirStr + directory + '/'        
                    console.log(currentDirStr)
                }
                currentDir = await client.list(currentDirStr)
                break;
            case 'end':
                terminate = true
                break;
            } 
    }
    while(terminate === false);
    await client.close()
}

function length(obj) { // Funciton length used to return the length of 
    return Object.keys(obj).length;
}


