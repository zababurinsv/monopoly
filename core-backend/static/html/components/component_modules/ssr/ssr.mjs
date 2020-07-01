import puppeteer from "puppeteer";

const RENDER_CACHE = new Map();
export default (views, property, color, substrate, relation)=>{
    return new Promise( async (resolve, reject) => {
        let out = (obj) => {
            resolve(obj)
        }

        let err = (error) => {
            reject(error)
        }
        switch (relation) {
            case 'render':

                break
            default:
                    try {
                        const start = Date.now();
                        // if (RENDER_CACHE.has(relation)) {
                        //     console.info(`Headless rendered page in: ttRender 0 Ms `);
                        //     out(RENDER_CACHE.get(relation))
                        // }

                        let browser = await puppeteer.launch({
                            args: ['--no-sandbox'],
                            headless: true });
                        let page = await browser.pages()
                        page[0].setViewport({
                            width: 1024,
                            height: 768
                        });

                        await page[0].goto(substrate, {waitUntil: 'networkidle0'})

                        // let iframe_remove= "iframe";
                        // await page[0].evaluate((sel) => {
                        //     let elements = document.querySelectorAll(sel);
                        //     for(let i=0; i< elements.length; i++){
                        //
                        //         console.log('~~~~~~~elements~~~~~~~~', elements[i])
                        //
                        //         elements[i].parentNode.removeChild(elements[i]);
                        // }
                        // }, iframe_remove)
                        //
                        // let div_selector_to_remove= "script";
                        // await page[0].evaluate((sel) => {
                        //     let elements = document.querySelectorAll(sel);
                        //     for(let i=0; i< elements.length; i++){
                        //
                        //         console.log('~~~~~~~elements~~~~~~~~', elements[i])
                        //
                                // elements[i].parentNode.removeChild(elements[i]);
                            // }
                        // }, div_selector_to_remove)
                        //
                        // const cookiesObject = await page[0].cookies()

                        let html  = await page[0].content()

                        // html.replace("js-agent", "ss")
                        // console.log('~~~~~~~~~~~',html.indexOf('js-agent'))

                        await browser.close();


                        const ttRenderMs = Date.now() - start;
                        console.info(`Headless rendered page in: ${ttRenderMs}ms`);
                        // RENDER_CACHE.set(relation, html);

                        out({
                            cookies: '',
                            html: html
                        })

                    } catch (e) { err(e) }
                break
        }
    })
}

