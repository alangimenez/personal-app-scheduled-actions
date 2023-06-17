class AppBackClient {
    constructor(
        host = 'https://appback-1-p4314249.deta.app'
    ){}

    async getLoginToken() {
        const body = JSON.stringify({
            email: process.env.USER,
            password: process.env.PASSWORD
        })
        const tokenResponse = await fetch(
            `${host}/user/login`,
            {
                method: 'POST',
                body: body,
                headers: { 'Content-Type': 'application/json' }
            }
        )
        const tokenData = await tokenResponse.json()
        return tokenData.token
    }

    async saveQuotesAndOtherQuotes(token) {
        await fetch(
            `${host}/lastvalue/save`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            }
        )
    }
}

const appBackClient = new AppBackClient()

module.exports = appBackClient