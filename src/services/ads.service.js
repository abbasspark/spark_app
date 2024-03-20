const config = require('../config');
const puppeteerCore = require('puppeteer');
const { delay } = require('../utils/delay');
const { getRandomInt } = require('../utils/getRandomInt');
const fs = require('node:fs');

class AdsService {

  async loadWebsites() {
    try {
      const { data: { data } } = await global.axios.get(config.websitesEndpoint)
      for (const webpage of data) {
        await this.loadWebPage(webpage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getScreenShot(res) {
    try {
      const { data: { data } } = await global.axios.get(config.websitesEndpoint)
      const webpage = data[0]
      // Launch Chromium browser
      const browser = await puppeteerCore.launch({
        executablePath: config.chromiumPath, // Path to your Chromium executable
        defaultViewport: {
          width: 1920,
          height: 1080
        },
        headless: true // Run in headless mode
      });
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');

      // Navigate to the provided URL
      await page.goto(webpage.url, { timeout: 100000 }); // Wait until there are no more than 2 network connections for at least 500 ms

      const screenshot = await page.screenshot({ fullPage: true });

      // Save screenshot to file
      res.send(screenshot)

      await browser.close();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async loadWebPage(webpage) {
    try {
      // Launch Chromium browser
      const browser = await puppeteerCore.launch({
        executablePath: config.chromiumPath, // Path to your Chromium executable
        defaultViewport: {
          width: 1920,
          height: 1080
        },
        headless: true // Run in headless mode
      });
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');

      // Navigate to the provided URL
      await page.goto(webpage.url, { timeout: 100000 }); // Wait until there are no more than 2 network connections for at least 500 ms

      const screenshot = await page.screenshot({ fullPage: true });

      // Save screenshot to file
      fs.writeFileSync(`${webpage.name}.png`, screenshot);

      const minDelay = webpage.min * 1000; // Minimum delay in milliseconds (e.g., 2 seconds)
      const maxDelay = webpage.max * 1000; // Maximum delay in milliseconds (e.g., 5 seconds)
      const randomDelay = getRandomInt(minDelay, maxDelay);
      await delay(randomDelay);

      await browser.close();
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

module.exports = { AdsService }