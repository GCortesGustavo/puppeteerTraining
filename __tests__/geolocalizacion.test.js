const puppeteer = require("puppeteer")

describe("Geolocalización", () => {

    let browser
    let page

    beforeAll(async() => {

        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        page = await browser.newPage()

    }, 10000)

    afterAll(async() => {
        browser.close()
    })

    test('Cambio de la geolocalización', async() => { 
        const context = browser.defaultBrowserContext();

        await context.overridePermissions("https://chercher.tech/practice/geo-location.html", ['geolocation']);

        await page.setGeolocation({
            latitude:90, 
            longitude: 20
        });

        await page.goto("https://chercher.tech/practice/geo-location.html");

        await new Promise((resolve) => setTimeout(resolve, 5000));
        await page.setGeolocation({
            latitude:90, 
            longitude: 0
        });

        await page.goto("https://chercher.tech/practice/geo-location.html");

        await new Promise((resolve) => setTimeout(resolve, 5000));
        
    }, 35000)

})