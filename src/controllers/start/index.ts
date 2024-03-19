import cron from 'node-cron';
import { generateRandomTime } from './generateRandomTime';
import { login } from '../login';
import { getAllData } from '../getAllData';
import { loadWebPage } from '../loadWebPages';

export async function  startLoadingWebPages() {
  const cronSchedule = generateRandomTime();

  cron.schedule(cronSchedule, async () => {
    try {
      const token = await login();
      if (!token) {
        console.error('Authentication failed');
        return;
      }
  
      const { data } = await getAllData(token);
    for (const webpage of data.websites) {
      await loadWebPage(webpage);
    }
    } catch (error) {
      console.error('Error during scheduled task:', error);
    }
 });
}

