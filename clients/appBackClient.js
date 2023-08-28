const config = require('../config/config')
const fetch = require('node-fetch')
const logService = require('../services/logs/logService')

class AppBackClient {
    constructor(){}

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
        await logService.createNewMessage(tokenResponse)
        const tokenData = await tokenResponse.json()
        return tokenData.token
    }

    async saveQuotesAndOtherQuotes(token) {
        await fetch(
            `${config.HOST}/lastvalue/save`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            }
        )
    }
}

const appBackClient = new AppBackClient()

module.exports = appBackClient