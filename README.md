# Mail-Sender

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]

<!-- [![Test Coverage][coveralls-image]][coveralls-url] -->


Mail-Sender is an event emitting, node.js package for providing a mail template sending capabilities with various options.

Note: By default, mail-sender uses `ejs` as its template engine

<!-- **[Follow me (@troygoode) on Twitter!](https://twitter.com/intent/user?screen_name=troygoode)** -->

* [Installation](#installation)
* [Usage](#usage)
  * [Simple Usage](#This-is-how-to-set-it-up-for-your-project)
  * [Creating and Implementing a new Mail Provider](#Implement-a-mail-provider)
  * [Implementing a different template engine](#Implement-a-template-engine)
  * [Adding more infomation to mail](#adding-data-to-mail)
* [Configuration Options](#configuration-options)
* [Demo](#demo)
* [License](#license)
* [Author](#author)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install mail-sender
```
or

```sh
$ yarn add mail-sender
```
## Usage

### Simple Usage
To use the default template engine, create a folder containing all your mails in `ejs`. Each mail file (template) should be suffixed with `.template.[ext]` eg. `./templates/verification.template.ejs`

The package identifies the template file using the `.template.ejs`
```javascript
const { MailerSetup, Mail } = require('mail-sender')
const { SendGridProvider } = require('mail-sender/providers')
const sgMail = require('@sendgrid/mail');

// Adding SendGrid Provider
sgMail.setApiKey(/* Send Grid Key */)
const sgProvider = new SendGridProvider(sgMail);

const mailerOptions = {
  provider: sgProvider, 
  templateDir: path.join(__dirname, 'templates') 
}
// Mailer Ob
const mailer = MailerSetup.config(mailerOptions)

const mailOptions = const mail = new Mail({
  template: 'verification',
  to: 'blessedeni73@gmail.com',
  from: 'tochiadams3@gmail.com', // Use the email address or domain you verified above
  subject: 'From My Mailer',
})
// This is the Mail Object
const mail = new Mail(mailOptions)

// Add the template data
mail.addData({ user: 'Blessed' })

// Send mail
mailer.mailSender.send(mail)
```

### Configuring Mail-Sender

```javascript
const mailerOptions = {
  provider: /* A provider instance */, 
  templateDir: /* Template folder path */,
  templateEngineExtension: /* This parameter is optional: this is the preffered template engine file extension */
}

const mailOptions = {
  template: /* template name */,
  to: /* email */,
  from: /* email */, // Use the email address or domain you verified above
  subject: /* preffered subject */,
}
```
## Mail Class

  * `addData(data)`: This function is used to add the data that used inside the ejs template
    - `data`: this must be an Object
    

  * `addSubject(data)`: Adds the subject to the mail(although it can be added during mail creation)
    - `data`: this must be string

  * `addTo(data)`: Adds the reciever to the mail(although it can be added during mail creation)
    - `data`: this must be string

  * `addFrom(data)`: Adds the sender to the mail(although it can be added during mail creation). Use the email address or domain you verified

    - `data`: this must be string


## Provider

The provides provided for you are
  * `SendGridProvider`
  * `NodeMailerProvider`

These are classes that can be used as provider. You can create you own provider by extending the `Provider` class

i.e
```js
const Provider = require('mail-sender/core/Provider')
class NewProvider extends Provider {
  // implement the send()
  // Note: The `body` and `mail` are defaultly provided 
}
```

## Implementing A different template Engine
Coming Soon

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

[Obisike Treasure](https://github.com/Otrex) ([obisiket@gmail.com](mailto:obisiket@gmail.com))
