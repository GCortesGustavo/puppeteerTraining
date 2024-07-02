const puppeteer = require("puppeteer")

describe("Extrayendo informacion", () => {

    // it("Extrayendo el título de la página y la url", async() => {
    //     const browser = await puppeteer.launch({
    //         headless: false,
    //         defaultViewport: null
    //     })

    //     const page = await browser.newPage()
    //     await page.goto("http://platzi.com", {waitUntil: "networkidle0"})

    //     const titulo = await page.title()
    //     const url = await page.url()

    //     console.log("Titulo:", titulo);
    //     console.log("Url:", url);

    //     await browser.close()
    // }, 35000)

    it("Extraer la informacion de un elemento", async() => {
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto("http://platzi.com", {waitUntil: "networkidle0"})
        await page.waitForSelector("body > main > header > div > nav > ul > li:nth-child(4) > a")

        //Corre el método document.querySelector
        const nombreBoton = await page.$eval("body > main > header > div > nav > ul > li:nth-child(4) > a", (button) => button.textContent)

        console.log(nombreBoton);
        //Para extraer la información con Xpath
        // const [button] = await page.$x("/html/body/main/section[1]/a/div/div[2]/div[2]/button");
        // const propiedad = await button.getProperty("textContent")
        // const texto = await propiedad.jsonValue()
        

        // Segunda forma de extraer conXpath
        //const texto2 = await page.evaluate((name) => name.textContent , nombreBoton)

        //Tercer manera de extraer con xpath
        // const button3 = await page.waitForXPath("El XPath")
        //const texto3 = await page.evaluate((name) => name.textContent, button 3)

        // console.log("Nombre Boton" ,texto2);

        await browser.close()
    }, 35000)


    it("Contar los elementos de una página", async() => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto("http://platzi.com", {waitUntil: "networkidle0"})

        const images = await page.$$eval("h2", (imagenes) => imagenes.length)
    
        console.log("imagenes", images);

        await browser.close()
    }, 350000)
})