const fs = require("fs");
const path = require("path");

const Mail = require("./src/Mail");
const MailSender = require("./src/MailSender");
const { OptionsError } = require("./core/exceptions");

const validateOptions = (options = {}) => {
  const optionKeys = ["templateDir", "provider"];

  if (Object.values(options).length === 0) {
    throw new OptionsError(
      `no options added - options includes: ${[
        ...optionKeys,
        "templateEngineExtension",
      ].toString()}`
    );
  }
  for (const key of optionKeys) {
    if (!options[key]) throw new OptionsError(`${key} not found`);
  }

  if (!options.provider._isProvider) {
    throw new OptionsError(`invalid provider`);
  }

  if (typeof options.templateDir !== "string") {
    throw new OptionsError("invalid templateDir format");
  }
};

class MailerSetup {
  static config = (options = {}) => {
    validateOptions(options);
    return new MailerSetup(options);
  };

  constructor(options = {}) {
    this.options = options;
    this.mailSender = new MailSender();
    this.mailSender.templatePaths = this.resolveTemplateDir();
    this.mailSender.setUpEventListerners(options);
  }

  resolveTemplateDir() {
    const templateEngine = this.options.templateEngineExtension || "ejs";

    const templates = fs
      .readdirSync(this.options.templateDir)
      .filter((temp) => temp.includes(`template.${templateEngine}`));

    const templateMapEntries = templates.map((temp) => [
      path.basename(temp).replace(`.template.${templateEngine}`, ""),
      path.join(this.options.templateDir, temp),
    ]);

    return Object.fromEntries(templateMapEntries);
  }

  onSent(cb = (mail, result) => {}) {
    this.mailSender.on("sent", cb);
    return this;
  }

  onError(cb = (error, mail) => {}) {
    this.mailSender.on("error", cb);
    return this;
  }
}

exports.MailerTemplateSetup = MailerSetup;
exports.Mail = Mail;
