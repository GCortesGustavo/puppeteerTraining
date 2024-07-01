const puppeteer = require("puppeteer")

describe("Tipos de espera", ()=> {
    
    it("Mostrar todos los tipos de espera", async()=> {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto("http:/platzi.com", {waitUntil: "networkidle2"})

        //Esto reemplaza a waitForTimeout(5000)
        await new Promise(r => setTimeout(r, 3000))

        //Espera por un selector
        //await page.waitForSelector("body > main > header > div > figure > svg")

        //Espera por un Xpath
        //await page.waitForXPath("/html/body/main/header/div/figure/svg/g/path[1]");
        // const element = await page.waitForSelector('::-p-xpath(h2)') 
        // const node = await page.waitForSelector('xpath/h2');

        await page.goto("https://demoqa.com/modal-dialogs", {waitUntil: "networkidle2"})

        const button = await page.waitForSelector("#showSmallModal", { visible: true})
        await button.click({delay: 200})

        await browser.close()
    }, 350000)
})