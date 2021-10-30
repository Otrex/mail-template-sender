const { MailSendError } = require("../core/exceptions");
const EventEmitter = require("events");

class MailSender extends EventEmitter {
  templatePaths = {}

  setUpEventListerners(options = {}) {
    this.on('send', async (mail) => {
      try {
        const mailTemplatePath = this.templatePaths[mail.template]
        mail._addTemplatePath(mailTemplatePath)
        options.provider.addMail(mail);
        options.provider.addMailBody(await mail.render())
        await options.provider.send();
        this.emit('sent', mail)
      } catch (error) {
        this.emit("error", error, mail);
      }
    });

    this.on('error', (error) => {
      throw new MailSendError(error)
    })
  }

  send(mail) {
    if (mail._name !== 'Mail') {
      throw new MailSendError('invalid mail parameter')
    }
    this.emit('send', mail)
  }
}

module.exports = MailSender