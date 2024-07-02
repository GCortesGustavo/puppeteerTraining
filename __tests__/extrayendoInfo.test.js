const puppeteer = require("puppeteer")

describe("Extrayendo informacion", () => {

    it("Extrayendo el título de la página y la url", async() => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto("http://platzi.com", {waitUntil: "networkidle0"})

        const titulo = await page.title()
        const url = await page.url()

        console.log("Titulo:", titulo);
        console.log("Url:", url);

        await browser.close()
    }, 35000)
})