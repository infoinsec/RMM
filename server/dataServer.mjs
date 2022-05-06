import express from 'express'
import fs from 'fs'

//exress server
//accepts GET requests for the data.json file as json

const app = express();


app.get('/data.json', (req, res) => {
    console.log('got a request for data.json')
    let data = fs.readFileSync('../data.json', 'utf8')
    res.json(data);
});

app.listen(8080, () => {
    console.log('Server is listening on port 8080.');
});

