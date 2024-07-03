const puppeteer = require("puppeteer")

describe("Emulando en dispositivos", ()=> {

    let browser
    let page
    beforeAll(async() => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        //page = await browser.newPage()

        //para emular en modo incógnito
        const context = await browser.createBrowserContext()
        page = await context.newPage()

        await page.goto("http://platzi.com", {waitUntil: "networkidle0"})
    }, 15000)

    afterAll(async() => {
        await browser.close()
    },15000)

    test('Emulando dispositivos de forma manual', async() => { 
        await page.emulate({
            name: "Mi dispositivo", // Nombre del dispositivo
            viewport: {             // Propiedades del viewport
                width: 375,          // Ancho de la pantalla
                height: 667,         // Alto de la pantalla
                deviceScaleFactor: 2, // Factor de escala del dispositivo
                isMobile: true,       // Indica que es un dispositivo móvil
                hasTouch: true,       // Indica que tiene pantalla táctil
                isLandscape: false    // Indica que no está en modo horizontal
            },
            userAgent: "Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36",
        })
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }, 35000)

    test('Emulando un sitio de escritorio', async() => { 
        await page.setViewport({
            width: 1500,
            height: 800,
        })
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }, 20000)

    test('Emulando un sitio en una tablet', async() => { 

        const { KnownDevices } = require("puppeteer") // Importamos los dispositivos conocidos de puppeteer

        const tablet = KnownDevices["iPad Pro"]
        await page.emulate(tablet)

        await new Promise((resolve) => setTimeout(resolve, 3000));
    }, 20000)

    test('Emulando un sitio en una tablet-HORIZONTAL', async() => { 

        const { KnownDevices } = require("puppeteer")

        const tablet = KnownDevices["iPad landscape"]
        await page.emulate(tablet)

        await new Promise((resolve) => setTimeout(resolve, 3000));
    }, 20000)

    test("Emulando un sitio en un celular", async() => {
        const {KnownDevices} = require("puppeteer")

        const iphone = KnownDevices["iPhone 13"]
        await page.emulate(iphone)

        await new Promise((resolve) => setTimeout(resolve, 3000))

    }, 20000)
})