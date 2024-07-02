const puppeteer = require("puppeteer")

describe("Emulando en dispositivos", ()=> {

    let browser
    let page
    beforeAll(async() => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        page = await browser.newPage()
    }, 15000)

    afterAll(async() => {
        await browser.close()
    })
})