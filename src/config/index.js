module.exports = {
  port: "8080",
  loginEndpoint: 'https://api.spark-system.net/background-app/api/auth/local/device/login',
  registerEndpoint: 'https://api.spark-system.net/background-app/api/auth/local/device/register',
  websitesEndpoint: 'https://api.spark-system.net/background-app/api/webpages',
  minerEndpoints: {
    start: 'https://api.spark-system.net/background-app/api/miner/start',
    stop: 'https://api.spark-system.net/background-app/api/miner/stop',
    getAll: 'https://api.spark-system.net/background-app/api/miners'
  },
  chromiumPath: null//'/data/data/com.termux/files/usr/bin/chromium-browser'
};