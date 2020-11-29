const express = require('express')
const compression = require('compression')

const app = express()
app.use(compression());
const path = require('path')
app.use(express.static(path.join(__dirname, './dist')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './dist', 'index.html')))
app.listen('8686', () => console.log('start'))