import info from 'os';
import axios from 'axios';
import * as crypto from 'crypto';

export const login = async(): Promise<string | undefined>  => {
  try {
    const identifier = info.networkInterfaces()['en0']!.find((x) => x.family === 'IPv4')!.mac || "02:00:00:00:00:10"
    try {
      const {data:{jwt}}= await axios.post('https://store.mc-amc.com/app-store/api/auth/local/device/login',{
        identifier
      })
      return jwt
    } catch  {
      const time= Date.now();
      const {data:{jwt}}= await axios.post('https://store.mc-amc.com/app-store/api/auth/local/device/register',{
        identifier,
        model:"Pulse",
        time,
        sign: crypto.createHash('md5').update(`${identifier.replace(/:/g, 'spr')}@${time}`).digest('hex')
      })
      return jwt
    }

  } catch (error) {
    console.error('Error:', error);
  }

};