const config = require('../config/config')
const fetch = require('node-fetch')
const logService = require('../services/logs/logService')

class AppBackClient {
    constructor() { }

    async getLoginToken() {
        const body = JSON.stringify({
            email: process.env.USER,
            password: process.env.PASSWORD
        })
        const tokenResponse = await fetch(
            `${config.HOST}/user/login`,
            {
                method: 'POST',
                body: body,
                headers: { 'Content-Type': 'application/json' }
            }
        )
        await logService.createNewMessage(`Get token. Status ${tokenResponse.status}`)
        const tokenData = await tokenResponse.json()
        return tokenData.token
    }

    async saveQuotesAndOtherQuotes(token) {
        const data = await fetch(
            `${config.HOST}/lastvalue/save`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            }
        )
        await logService.createNewMessage(`Save quotes and other quotes. Status ${data.status}`)
    }
}

const appBackClient = new AppBackClient()

module.exports = appBackClient