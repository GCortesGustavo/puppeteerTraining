const puppeteer = require("puppeteer")

describe("Performance", () => {

    let browser
    let page
    
    beforeAll(async() => {
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        })
        
        page = await browser.newPage()
        
    }, 10000)

    afterAll(async() => {
        await browser.close()
    })

    test('Medir performance de la automatizacion', async() => { 
        await page.goto("https://platzi.com")

        await page.waitForSelector("img")
        const metrics = await page.metrics()
        console.log(metrics);

    }, 35000)

    test("Medir el performance de la pagina", async()=>{
        await page.goto("https://platzi.com")

        await page.waitForSelector("img");
        const metrics2 = await page.evaluate(()=>JSON.stringify(window.performance));
        console.log(metrics2);
    }, 35000)


    test("Medir el performance de la page load", async()=>{
        await page.tracing.start({
            path: "profile.json"
        })

        await page.goto("https://google.com")
        await page.tracing.stop()

    }, 35000)

    test("Medir el performance de la page load con screenshots", async()=>{
        await page.tracing.start({
            path: "profile.json",
            screenshots: true
        })

        await page.goto("https://google.com")
        await page.tracing.stop()

    }, 35000)

    test("Medir el performance de la page load con screenshots y extrayendolos", async()=>{
        const fs = require('fs')

        await page.tracing.start( {path: "profile.json", screenshots:true});
        await page.goto("https://platzi.com");
        await page.waitForSelector("img");
        await page.tracing.stop()
        const tracing = JSON.parse(fs.readFileSync("./profile.json", "utf8"))
        //Filtrar el JSON
        const traceScreenShots = tracing.traceEvents.filter(
            (x)=>
            x.cat === 'disabled-by-default-devtools.screenshot' &&
            x.name === 'Screenshot' &&
            typeof x.args !== 'undefined' &&
            typeof x.args.snapshot !== 'undefined'
        )

        //Iterar sobre este arreglo para crear la simagenes
        traceScreenShots.forEach(function(snap, index){
            fs.writeFile(`trace-screenshot-${index}.png`, snap.args.snapshot, 'base64', function(err){
                if (err) {
                    console.log('No pude crear el archivo', err)
                };
            });           
        });
    }, 350000)
})