//A client that sends a node fetch POST request to the server and prints the response.
import fetch from 'node-fetch'
import osu from 'node-os-utils'
const {cpu, drive, mem } = osu
import os from 'os'

sendStats()
setInterval(sendStats, 5000)

async function sendStats() {
    var body = {}
    body.hostname = os.hostname()
    let cpuCount = cpu.count()
    body.cpuCount = cpuCount
    let cpuUsage = await cpu.usage()
    body.cpuUsage = cpuUsage
    // let driveFreeSpace = await drive.info('/')
    // driveFreeSpace = driveFreeSpace.usedPercentage
    // body.driveUsed = driveFreeSpace
    let memUsed = await mem.info()
    memUsed = memUsed.usedMemPercentage
    body.memUsed = round(memUsed, 2)

    // body.test = "test"
    // console.log(`CPU count: ${count}`)
    
    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => console.log(res));
}

//round a number to the specified number of decimal places
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}