const { InfoService } = require('../services/info.service');

class InfoController {
  constructor() {
    this.service = new InfoService()
  }
  async checkInfo(res) {
    try {
      await this.service.checkInfo(res)
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = new InfoController()