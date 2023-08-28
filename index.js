const config = require('./config/config.js')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8082
const actions = require('./actions/actions')
const logService = require('./services/logs/logService.js')

app.use(cors())

app.use(express.json());

app.post('/__space/v0/actions', async (req, res) => {
    await logService.createNewMessage(`event before if ${req.body}`)
    if (req.body.event.id == 'savequotes') {
        await logService.createNewMessage(`event ${req.body.event.id}`)
        await actions.saveQuotesAndOtherQuotes()
        await logService.createNewMessage(`paso por aca`)
        res.json().status(201)
    }
})

app.listen(port, () => {
    console.log(`Server listening on ${port}, environment ${config.NODE_ENV}`);
});