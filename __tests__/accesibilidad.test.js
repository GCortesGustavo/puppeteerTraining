const puppeteer = require("puppeteer")
const { AxePuppeteer } = require("@axe-core/puppeteer")

describe("Pruebas de accesibilidad", () => {

    let browser
    let page
    
    beforeAll(async() => {
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        })

        page = await browser.newPage()
    }, 10000)

    afterAll(async() => {
        await browser.close()
    })

    test('Accesibilidad', async() => { 

        await page.goto("https://platzi.com")
        await page.waitForSelector("img")
        const snapshot = await page.accessibility.snapshot()
        console.log(snapshot);

    }, 45000)


    test('Probando accesibilidad con axe', async() => { 

        
        await page.setBypassCSP(true)
        await page.goto("https://platzi.com")
        await page.waitForSelector("img")

        const result = await new AxePuppeteer(page).analyze()
        console.log(result.violations);

    }, 45000)
})