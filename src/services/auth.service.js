const info = require('os');
const axios = require('axios').default;
const crypto = require('crypto');
const config = require('../config');

class AuthService {
  constructor() {
    this.token = null;
    this.axiosInstance = axios.create(); // Create axios instance without token initially
  }
  async login() {
    const identifier = info.networkInterfaces()['wlan0'].find((x) => x.family === 'IPv4').mac || "02:00:00:00:00:10"
    global.identifier = identifier
    try {
      const { data: { jwt } } = await axios.post(config.loginEndpoint, {
        identifier
      })
      this.token = jwt;
      this.updateAxiosInstance();
      return jwt
    } catch {
      const time = Date.now();
      const { data: { jwt } } = await axios.post(config.registerEndpoint, {
        identifier,
        model: "Pulse",
        time,
        sign: crypto.createHash('md5').update(`${identifier.replace(/:/g, 'spr')}@${time}`).digest('hex')
      })
      this.token = jwt;
      this.updateAxiosInstance();
      return jwt
    }

  }
  updateAxiosInstance() {
    // Update axios instance with Bearer token
    this.axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
    global.axios = this.axiosInstance
  }

  getAxiosInstance() {
    if (!this.token) {
      throw new Error('Token not available. Please login first.');
    }
    return this.axiosInstance;
  }
}

module.exports = { AuthService }