const puppeter = require("puppeteer")

describe("Interactuando con elementos", () => {
    
    it("Debe hacer algo", async () => {
        const browser = await puppeter.launch({
            headless: false,
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto("http://demo.guru99.com/test/simple_context_menu.html")
        
        //Click derecho
        await page.click("#authentication > span", { button: "right", delay: 500})

        //Doble click
        await page.click("#authentication > button", {clickCount:2, delay:500})
        
        // page.on("dialog", async(dialog) => {

        //     await dialog.accept()
        // })
        
        await browser.close()
    }, 40000)
})