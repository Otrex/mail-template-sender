class Provider {
  _isProvider = true

  addMail(mail) {
    this.mail = mail
  }

  addMailBody(body = "") {
    this.body = body
  }

  async send() {}
}

module.exports = Provider