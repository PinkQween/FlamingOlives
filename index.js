const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 800, height: 600 }); // Adjust as needed

    await page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image Layout</title>
        <style>
            body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .container {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                height: 100%;
            }
            .left-section {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 50%;
                height: 100%;
            }
            .right-section {
                width: 50%;
                height: 100%;
            }
            img {
                max-width: 100%;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="left-section">
                <h2>Left:</h2>
                <img src="https://example.com/image1.jpg" alt="Image 1">
                <img src="https://example.com/image2.jpg" alt="Image 2">
                <img src="https://example.com/image3.jpg" alt="Image 3">
            </div>
            <div class="right-section">
                <h2>Right:</h2>
                <img src="https://example.com/image4.jpg" alt="Image 4">
            </div>
        </div>
    </body>
    </html>
    `);

    const screenshot = await page.screenshot({ encoding: 'base64' });

    await browser.close();

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': screenshot.length
    });
    res.end(Buffer.from(screenshot, 'base64'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
