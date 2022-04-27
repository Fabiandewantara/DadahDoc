const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const port = process.env.PORT||3030

const router = require('./routes')
const cors = require('cors')

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({
    extended:true
}))

app.use('/', router)

// app.get('/', (req, res) => {
//     res.send('Hello Di Route Awal!')
// })

app.listen(port, () => {
    console.log(`Hello World ! ! ! | online at http://localhost:${port}`)
})