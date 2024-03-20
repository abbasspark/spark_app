const { AdsService } = require('../services/ads.service');

class AdsController {
  constructor() {
    this.service = new AdsService()
  }

  async load() {
    try {
      await this.service.loadWebsites()
    } catch (error) {
      throw new Error(error)
    }
  }

  async screenshot(res) {
    try {
      await this.service.getScreenShot(res)
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = new AdsController()