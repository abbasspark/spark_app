const { AdsService } = require('../services/ads.service');
const { AuthService } = require('../services/auth.service');

class AdsController {
  constructor() {
    this.service = new AdsService()
  }

  async start() {
    try {
      await this.service.loadWebsites()
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = new AdsController()