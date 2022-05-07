//An express server that accepts POST requests in the form of JSON objects and returns a JSON object with the response.
import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'

const app = express()
app.use(bodyParser.json())
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()
})

var data = {}
app.post('/', (req, res) => {
    let body = req.body
    // console.log(body)
    for (const [key, value] of Object.entries(body)) {
        console.log(`${key}: ${value}`)
    }
    let hostname = body.hostname
    delete body.hostname
    if (!data[hostname]) data[hostname] = []
    if (data[hostname].length > 5) data[hostname].shift()
    data[hostname].push(body)
    //write object to file
    fs.writeFile(`../data.json`, JSON.stringify(data), (err) => {
        if (err) throw err
        console.log('The file has been saved! :')
        console.log(data)
        res.json({
            message: `Success!`
        })
    })
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000.')
})