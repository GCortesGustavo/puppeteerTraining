const puppeteer = require("puppeteer")

const { toMatchImageSnapshot } = require("jest-image-snapshot")
expect.extend({ toMatchImageSnapshot })

describe("Visual Test", () => {

    let browser 
    let page

    beforeAll(async() => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        page = await browser.newPage()
        await page.goto("http://platzi.com", {waitUntil: "networkidle0"})
    }, 35000)

    afterAll(async() => {
        browser.close()
    })

    test('Snapshot de toda la pagina', async () => { 

        await page.waitForSelector("img")

        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot()

    }, 35000)

    test("Snapshot de un solo elemento", async() => {

        const image = await page.waitForSelector("img")

        const screenshot = await image.screenshot()

        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: "percent"
        })
    }, 35000)

    test("Snapshot de un dispositivo movil", async() => {

        const { KnownDevices } = require("puppeteer") // Importamos los dispositivos conocidos de puppeteer

        const tablet = KnownDevices["iPad Pro"]
        await page.emulate(tablet)

        await page.waitForSelector("img")

        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: "percent"
        })
    }, 35000)

    test("Remover una imagen antes de crear snapshot", async() => {
        await page.waitForSelector("img")

        await page.evaluate(() => (document.querySelectorAll("img") || []).forEach(img => img.remove()))

        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: "percent"
        })
    }, 35000)
})