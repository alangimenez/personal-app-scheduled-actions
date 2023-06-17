require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8082
const actions = require('./actions/actions')

app.use(cors())

app.use(express.json());

app.post('/__space/v0/actions', async (req, res) => {
    if (req.body.event.id == 'savequotes') {
        await actions.saveQuotesAndOtherQuotes()
        res.json().status(201)
    }
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});