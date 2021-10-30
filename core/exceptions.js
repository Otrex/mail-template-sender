class OptionsError extends Error {
  constructor(msg) {
    super(msg)
    this.message = msg
    this.name = OptionsError.constructor.name
  }
}

class MailSendError extends Error {
  constructor(msg) {
    if (typeof msg === "string") {
      super(msg)
      this.message = msg
    } else {
      super(msg.message)
      this.message = msg.message
      this.stack = msg.stack
    }
    this.name = OptionsError.constructor.name
  }
}

module.exports = {
  OptionsError,
  MailSendError
}