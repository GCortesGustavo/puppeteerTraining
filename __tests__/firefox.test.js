const puppeteer = require("puppeteer")

describe("Firefox", () => {

    let browser
    let page

    beforeAll(async() => {
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            product: "firefox",
            protocol: "webDriverBiDi"
        })

        page = await browser.newPage()
        await page.goto("https://platzi.com", {waitUntil: "networkidle0"})
    }, 30000)

    afterAll(async() => {
        browser.close()
    })


    it("Extrayendo el título de la página y la url", async() => {
        const titulo = await page.title()
        const url = await page.url()

        console.log("Titulo:", titulo);
        console.log("Url:", url);

    }, 45000)
}, 100000)