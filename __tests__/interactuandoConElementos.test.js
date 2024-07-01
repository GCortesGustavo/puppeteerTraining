const puppeter = require("puppeteer")

describe("Interactuando con elementos", () => {
    
    it("Interactuar con elementos", async () => {
        const browser = await puppeter.launch({
            headless: false,
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto("http://demo.guru99.com/test/simple_context_menu.html")
        
        //Con esta instruccion le damos aceptar a los alerts que nos salgan en la pagina
        page.on('dialog', async (dialog) => {
            await dialog.accept()
        })

        //Click derecho
        await page.click("#authentication > span", { button: "right", delay: 500})

        //Doble click
        await page.click("#authentication > button", {clickCount:2, delay:800})
        

        
        await page.goto("http:/devexpress.github.io/testcafe/example/")

        await page.type("#developer-name", "Gustavo", {delay: 200})
        await page.click("#remote-testing", {delay: 200})
        await page.click("#tried-test-cafe", {delay: 200})
        await page.type("#comments", "Esto es una prueba", {delay:300})
        await page.click("#submit-button", {delay:300})
        
        await new Promise(r => setTimeout(r, 3000));

        await browser.close()
    }, 350000)
})