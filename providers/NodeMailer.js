const Provider = require("../core/Provider");

class NodeMailerProvider extends Provider {
  constructor(transporter) {
    super();
    this.transporter = transporter;
  }

  async send() {
    const options = {
      to: this.mail.to,
      from: this.mail.from,
      subject: this.mail.subject,
      html: this.body,
    };
    return this.transporter.sendMail(options);
  }
}

module.exports = NodeMailerProvider;
