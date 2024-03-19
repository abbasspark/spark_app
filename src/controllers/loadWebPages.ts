import puppeteerCore from 'puppeteer';
import fs from 'fs';
import { delay } from './start/delay';
import { Website } from '../types/Websites';
import { getRandomInt } from './start/getRandomInt';
export const loadWebPage = async(webpage:Website) => {
  try {
    // Launch Chromium browser
    const browser = await puppeteerCore.launch({
      //executablePath: '/data/data/com.termux/files/usr/bin/chromium-browser', // Path to your Chromium executable
      headless: true // Run in headless mode
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');

    // Navigate to the provided URL
    await page.goto(webpage.url, { timeout: 100000 }); // Wait until there are no more than 2 network connections for at least 500 ms

    const screenshot = await page.screenshot({ fullPage: true });

    // Save screenshot to file
    fs.writeFileSync(`${webpage.name}.png`, screenshot);

    const minDelay = webpage.min*1000; // Minimum delay in milliseconds (e.g., 2 seconds)
    const maxDelay = webpage.max*1000; // Maximum delay in milliseconds (e.g., 5 seconds)
    const randomDelay = getRandomInt(minDelay, maxDelay);
    await delay(randomDelay);

    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }

};