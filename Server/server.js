const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const app = express()
app.use(cors())
const apiKey = process.env.API_KEY

port = 3000

app.get('/tesla', async (req, res) => {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-02-30&sortBy=publishedAt&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        res.json(data)
    }
    catch (error) {
        console.error("Error")
        res.status(500).json({ error: "Error" })
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})