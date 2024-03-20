const { MinerService } = require('../services/miner.service');

class AdsController {
  constructor() {
    this.service = new MinerService()
  }
  async download() {
    try {
      await this.service.download()
    } catch (error) {
      throw new Error(error)
    }
  }

  async start() {
    try {
      await this.service.start()
    } catch (error) {
      throw new Error(error)
    }
  }

  async stop() {
    try {
      await this.service.stop()
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = new AdsController()