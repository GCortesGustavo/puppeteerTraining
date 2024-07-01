const puppeteer = require("puppeteer");

describe("Primer test en mi vida", () => {
    it("Tiene que abrir y cerrar el navegador", async () => {
        const browser = await puppeteer.launch({
            // headless: true hace que no se abra el navegador y que las pruebas sean
            // más rápidas. headless: false siempre abre el navegador.
            headless: false,
            // slowMo nos permite ver las acciones en cámara lenta.
            slowMo: 0,
            // devtools por defecto es false. Si es true, nos abre las herramientas de desarrollo en el navegador.
            devtools: false,
            // defaultViewport establece el tamaño de la ventana de visualización.
            defaultViewport: {
                width: 2100,
                height: 1080,
            },
            // args es un array de argumentos de configuración del navegador.
            args: [
                // '--window-size=1920,1080', // tamaño de la ventana
            ],
            // maximiza el viewport de la página al tamaño de la ventana.
            defaultViewport: null,
        });

        // Abre una nueva página en el navegador
        const page = await browser.newPage();
        // Navega a la URL especificada
        await page.goto("https://github.com/GCortesGustavo/");
        // Espera a que el selector 'img' esté presente en la página
        await page.waitForSelector("img", { timeout: 5000 });
        // Recarga la página
        await page.reload();
        // Espera a que el selector 'img' esté presente en la página después de la recarga
        await page.waitForSelector("img", { timeout: 5000 });

        // Navega a otra URL
        await page.goto("https://github.com/GCortesGustavo/puppeteerTraining");
        // Espera a que el selector especificado esté presente en la página
        await page.waitForSelector("body", { timeout: 5000 });

        // Navega hacia atrás en el historial de navegación
        await page.goBack();
        // Espera a que el selector 'img' esté presente en la página después de navegar hacia atrás
        await page.waitForSelector("img", { timeout: 5000 });

        // Navega hacia adelante en el historial de navegación
        await page.goForward();
        // Espera a que el selector 'body' esté presente en la página después de navegar hacia adelante
        await page.waitForSelector("body", { timeout: 5000 });

        // Abre otra página en una nueva pestaña
        const page2 = await browser.newPage();
        // Navega a la URL especificada
        await page2.goto('https://github.com/');
        // Espera 2 segundos
        // await page2.waitForTimeout(2000);

        // Cierra el navegador
        await browser.close();
    }, 40000); // Tiempo máximo para que la prueba se complete
});
