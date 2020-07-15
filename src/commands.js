const processes = require('./processes')
const readLine = require('readline-sync')

module.exports.cd = async (actionBreakdown, currentDirStr, currentDir) => {
    if (actionBreakdown[1] === '/') {
        currentDirStr = '/'
    } else if (actionBreakdown[1] === '../') {
        var split = currentDirStr.split('/')
        let splitArr = split
        var len = processes.length(split) - 1
        for (i = 0; i <= len - 2; i++) {
            if (i === 0) {
                currentDirStr = '/'
            }else if (i === len - 2){
                if (i > 1) {
                    currentDirStr = currentDirStr + '/' + splitArr[i] + '/'
                } else {
                    currentDirStr = currentDirStr + splitArr[i] + '/'
                }
                console.log(currentDirStr)
            } else{
                if (i === 1) {
                    currentDirStr = currentDirStr + splitArr[i]
                    console.log(currentDirStr)
                } else {
                    currentDirStr = currentDirStr + '/' + splitArr[i]
                    console.log(currentDirStr)
                }
            }
        }
    } else {
        let search = []
        for (i = 0; i <= processes.length(currentDir) - 1; i++) {
            search[i] = currentDir[i].name
        }
        let linear = processes.linearSearch(search, actionBreakdown[1])
        if (linear[0] === true) currentDirStr = currentDirStr + actionBreakdown[1] + '/'        
        console.log(currentDirStr)
    }

    return currentDirStr
}

module.exports.dl = async (actionBreakdown, currentDirStr, currentDir, client) => {
    
    // Log progress for any transfer from now on.
    client.trackProgress(info => {
        console.log("File", info.name)
        console.log("Type", info.type)
        console.log("Transferred", info.bytes)
        console.log("Transferred Overall", info.bytesOverall)
    })


    let search = []
    for (i = 0; i <= processes.length(currentDir) - 1; i++) {
        search[i] = currentDir[i].name
    }
    let linear = processes.linearSearch(search, actionBreakdown[1])

    var file = currentDirStr + actionBreakdown[1]
    var dl = actionBreakdown[2] + '/' + actionBreakdown[1]

    if (linear[0] === true) {
        client.trackProgress(info => console.log(info.bytesOverall))
        await client.downloadTo(dl, actionBreakdown[1])
        client.trackProgress()
    }
    
}
