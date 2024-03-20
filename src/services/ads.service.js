const config = require('../config');
const puppeteerCore = require('puppeteer');
const { delay } = require('../utils/delay');
const { getRandomInt } = require('../utils/getRandomInt');
const fs = require('node:fs');

class AdsService {
  constructor() {
    this.args = [
      '--no-sandbox', // Disables the sandbox for unprivileged processes
      '--disable-setuid-sandbox', // Disables the setuid sandbox (Linux only)
      '--disable-dev-shm-usage', // Reduces memory usage
      '--disable-gpu', // Disables GPU acceleration
      '--disable-software-rasterizer', // Disables software rendering
      '--no-zygote', // Disables the use of the zygote process for forking child processes
      '--disable-background-networking', // Disables various background network services
      '--disable-background-timer-throttling', // Disables various background timers
      '--disable-breakpad', // Disables crash reporting
      '--disable-client-side-phishing-detection', // Disables client-side phishing detection
      '--disable-default-apps', // Disables installation of default apps on first run
      '--disable-extensions', // Disables extensions
      '--disable-features=site-per-process', // Disables site isolation per process
      '--disable-hang-monitor', // Disables the hang monitor
      '--disable-prompt-on-repost', // Disables prompting the user when a page requests to submit a form again
      '--disable-sync', // Disables syncing browser data with Google servers
      '--disable-translate', // Disables the translate feature
      '--metrics-recording-only', // Enables recording of metrics only
      '--no-first-run', // Skip first run wizards
      '--safebrowsing-disable-auto-update', // Disables automatic updates of Safe Browsing lists
      '--password-store=basic', // Uses a basic password store
      '--disk-cache-size=0', // Disable disk cache
      '--media-cache-size=0', // Disable media cache
      '--single-process', // Run Chromium in single-process mode (more memory but faster startup)
    ]
  }

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
        headless: true, // Run in headless mode
        ignoreHTTPSErrors: true, // Ignore HTTPS errors
        args: this.args
      });
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');

      // Navigate to the provided URL
      await page.goto(webpage.url, { timeout: 100000 }); // Wait until there are no more than 2 network connections for at least 500 ms

      const screenshot = await page.screenshot({ fullPage: true });

      res.set('Content-Type', 'image/png');
      res.send(screenshot);

      await browser.close();
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error capturing screenshot');
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
        headless: true, // Run in headless mode
        ignoreHTTPSErrors: true, // Ignore HTTPS errors
        args: this.args
      });
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');

      // Navigate to the provided URL
      await page.goto(webpage.url, { timeout: 100000 }); // Wait until there are no more than 2 network connections for at least 500 ms

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