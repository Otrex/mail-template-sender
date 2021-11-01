const { MailSendError } = require("../core/exceptions");
const { promisify } = require("util");
const ejs = require("ejs");

const ejsRenderer = ({ template, data }, cb) => {
  ejs.renderFile(template, data, {}, cb);
};

class Mail {
  _name = "Mail";

  constructor({ template, to, from, subject }) {
    this.template = template;
    this.subject = subject;
    this.to = to;
    this.from = from;
    this.data = {
      from: this.from,
      to: this.to,
      subject: this.subject,
    };
  }

  addData(data) {
    this.data = { ...this.data, ...data };
    return this;
  }

  addSubject(data) {
    this.subject = data;
    return this;
  }

  addTo(data) {
    this.to = data;
    return this;
  }

  addFrom(data) {
    this.from = data;
    return this;
  }

  _addTemplatePath(pathx) {
    this.templatePath = pathx;
    return this;
  }

  async render() {
    if (!this.templatePath) throw new MailSendError("no template path added");
    const renderedMail = await promisify(ejsRenderer)({
      template: this.templatePath,
      data: this.data,
    });
    return renderedMail;
  }
}

module.exports = Mail;
