const info = require('os');

class InfoService {


  async checkInfo(res) {
    res.send({
      platform: info.platform(),
      release: info.release(),
      freemem: info.freemem(),
      machine: info.machine(),
      networkInterfaces: info.networkInterfaces(),
      type: info.type(),
      arch: info.arch(),
      userInfo: info.userInfo(),
      version: info.version(),
      cpus: info.cpus(),
    })
  }

}

module.exports = { InfoService }