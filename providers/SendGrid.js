const Provider = require("../core/Provider");

class SendGridProvider extends Provider {
  constructor(SGObject = {}) {
    super();
    this.sendGridMail = SGObject;
  }

  async send() {
    const options = {
      to: this.mail.to,
      from: this.mail.from,
      subject: this.mail.subject,
      html: this.body
    }
    await this.sendGridMail.send(options);
  }
}

module.exports = SendGridProvider