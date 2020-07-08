const processes = require('./processes')

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
        var linear = processes.linearSearch(search, actionBreakdown[1])
        if (linear === true) currentDirStr = currentDirStr + actionBreakdown[1] + '/'        
        console.log(currentDirStr)
    }

    return currentDirStr
}

module.exports.dl = async (actionBreakdown, currentDirStr, currentDir, client) => {
    var file = currentDirStr + actionBreakdown[1]
    console.log(file)
    console.log(actionBreakdown[2])
    await client.downloadToDir(actionBreakdown[2], file)
}