const appBackClient = require('../clients/appBackClient')

class Actions {
    constructor(){}

    async saveQuotesAndOtherQuotes() {
        const token = await appBackClient.getLoginToken()
        await appBackClient.saveQuotesAndOtherQuotes(token)
    }
}

const actions = new Actions()

module.exports = actions