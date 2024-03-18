const express = require('express');
const svg2png = require('svg2png');

const app = express();
const port = 3000;

// Define the SVG content
const SVG_CONTENT = `
<svg width="1000" height="600" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g class="container">
        <g class="left-section">
            <image
                xlink:href="https://github-profile-trophy.vercel.app/?username=FlamingOlives&amp;theme=radical"
                x="0" y="0" alt="Image 1" />
            <image
                xlink:href="https://github-readme-stats.vercel.app/api?username=FlamingOlives&amp;show_icons=true&amp;theme=radical"
                x="0" y="150" alt="Image 2" />
            <image
                xlink:href="https://github-readme-stats.vercel.app/api/top-langs/?username=FlamingOlives&amp;theme=radical&amp;layout=compact"
                x="0" y="400" alt="Image 3" />
        </g>
        <g class="right-section">
            <image xlink:href="https://avatars.githubusercontent.com/u/141564336?v=4" x="500"
                y="150" alt="Image 4" />
        </g>
    </g>
</svg>
`;

app.get('/', async (req, res) => {
    try {
        // Convert SVG to PNG
        const pngBuffer = await svg2png(SVG_CONTENT);

        // Set response content type to image/png
        res.contentType('image/png');

        // Send PNG buffer as response
        res.send(pngBuffer);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
