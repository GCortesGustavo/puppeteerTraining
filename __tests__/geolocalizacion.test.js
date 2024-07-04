const puppeteer = require("puppeteer")

describe("Geolocalización", () => {

    let browser
    let page

    beforeAll(async() => {

        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        })

        page = await browser.newPage()

        await page.goto("http://platzi.com", {waitUntil: "networkidle0"})
    }, 10000)

    afterAll(async() => {
        browser.close()
    })

    test('Cambio de la geolocalización', async() => { 
        const context = browser.defaultBrowserContext()

        await context.overridePermissions("https://chercher.tech/practice/geo-location.html", ['geolocation'])

    }, 35000)

})