const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
app.listen(PORT, console.log("http://localhost:"+PORT));
app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html');
})
app.use(express.urlencoded());
app.post('/', (req,res) => {
    const url = req.body.url;
    const key = req.body.key;
    let raw = fs.readFileSync('storage.json');
    let data = JSON.parse(raw);
    if(data[key] !== undefined) res.send('key already taken');
    data[key] = url;
    fs.writeFileSync('storage.json', JSON.stringify(data));
    res.redirect('/');
})
app.get('/:key', (req,res) => {
    let raw = fs.readFileSync('storage.json');
    let data = JSON.parse(raw);
    if(data[req.params.key] === undefined) res.redirect('/');
    res.redirect(data[req.params.key]);
})