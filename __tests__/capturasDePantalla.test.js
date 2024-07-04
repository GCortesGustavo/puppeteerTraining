const puppeteer = require("puppeteer")

describe("Realizando capturas de pantalla", () => {

    let browser
    let page

    beforeAll(async() => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        page = await browser.newPage()
        await page.goto("http://google.com", {waitUntil: "networkidle0"})
    }, 35000)

    afterAll(async() => {
        await browser.close()
    }, 350000)

    it("captura de pantalla completa", async() => {
        await page.screenshot({
            path: "./capturaDePantalla.png",
            fullPage: true
        })

    }, 35000)

    test('Captura de pantalla en un área', async() => { 
        await page.screenshot({
            path: "./capturaDePantallaEnUnArea.png",
            clip: {
                x: 0,
                y: 0,
                width: 500,
                height: 500
            }
        })
    }, 35000)


    test('Captura de pantalla con fondo transparente', async() => { 

        await page.evaluate(() => (document.body.style.background = "transparent"))

        await page.screenshot({
            path: "capturaDePantallaTransparente.png",
            omitBackground: true
        })
    }, 35000)

    test('Captura de pantalla a un elemento', async() => { 
        
        const selector = await page.waitForSelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img")
        

        await selector.screenshot({
            path: "CapturaDeUnElemento.png",
        })
    }, 35000)
})