const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

const PORT = process.env.PORT || 3000;

let screenshot = null;

const getImage = async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({ width: 800, height: 600 }); // Adjust as needed
        await page.goto(`http://localhost:${PORT}/html`);

        await page.waitForSelector('#done');

        const screenshotData = await page.screenshot({ encoding: 'base64' });

        await browser.close(); // Close the browser after taking the screenshot

        return screenshotData; // Return the screenshot data
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        return null;
    }
}

const run = async () => {
    screenshot = await getImage();
}

// Initial generation of the screenshot
run();

// Update the screenshot every hour
setInterval(run, 1000 * 60 * 60);

app.get('/', async (req, res) => {
    if (!screenshot) {
        return res.status(404).send('Image not available');
    }

    console.log(typeof screenshot);
    console.log(screenshot);

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': screenshot.length
    });
    res.end(Buffer.from(screenshot, 'base64'));
});

app.get('/html', (req, res) => {
    res.sendFile(__dirname + '/test.html');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});