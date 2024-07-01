const puppeteer = require("puppeteer")

describe("Primer test en mi vida", () => {
    it("Tiene que abrir y cerrar el navegador", async() => {
        const browser = await puppeteer.launch({
            // headless: true hace que no se habara el navegador y que las pruebas sean
            // más rápidas, el headless: false siempre nos abre el navegador
            headless: false,
            //slowmo nos indica en cámara lenta
            slowMo: 0,
            //devtools por defecto es false, si es true nos abre el devtools en el navegador
            devtools: false,
            defaultViewport: {
                width: 2100,
                height: 1080,
            },
            //argumentos en forma de array de la prueba 
            args: [
                // '--window-size=1920,1080', // tamaño de la ventana
            ],
            // máximiza el viewport de la página al tamaño de la ventana
            defaultViewport: null,
        })
        const page = await browser.newPage()
        await page.goto("https://github.com/GCortesGustavo/puppeteerTraining")
        await browser.close()
    }, 10000)
})