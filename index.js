require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require('node-fetch')
const port = process.env.PORT || 8082

app.use(cors())

app.use(express.json());

app.post('/__space/v0/actions', async (req, res) => {
    const body = JSON.stringify({
        email: "gimenezalan00@gmail.com",
        password: process.env.PASSWORD
    })
    const tokenResponse = await fetch(
        `https://appback-1-p4314249.deta.app/user/login`,
        {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/json' }
        }
    )
    const tokenData = await tokenResponse.json()
    const token = tokenData.token

    const minutes = new Date().getMinutes()

    const bodyTwo = JSON.stringify({
        assetType: `Cuenta prueba minutos ${minutes}`
    })
    await fetch(
        `https://appback-1-p4314249.deta.app/assettype`,
        {
            method: 'POST',
            body: bodyTwo,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }
    )
    res.json({message: 'ok'}).status(201)
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});