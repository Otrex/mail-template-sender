# mail-template-sender


mail-template-sender is an event emitting, node.js package for providing mail template sending capabilities with various options.

Note: By default, mail-template-sender uses `ejs` as its template engine

<!-- **[Follow me (@obisiket1) on Twitter!](https://twitter.com/intent/user?screen_name=obisiket1)** -->

- [Installation](#installation)
- [Usage](#usage)
  - [Simple Usage](#This-is-how-to-set-it-up-for-your-project)
  - [Creating and Implementing a new Mail Provider](#Implement-a-mail-provider)
  - [Implementing a different template engine](#Implement-a-template-engine)
  - [Adding more infomation to mail](#adding-data-to-mail)
- [Configuration Options](#configuration-options)
- [Demo](#demo)
- [License](#license)
- [Author](#author)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install mail-template-sender
```

or

```sh
$ yarn add mail-template-sender
```

## Usage

### Simple Usage

To use the default template engine, create a folder containing all your mails in `ejs`. Each mail file (template) should be suffixed with `.template.[ext]` eg. `./templates/verification.template.ejs`

The package identifies the template file using the `.template.ejs`

```javascript
const { MailerSetup, Mail } = require('mail-template-sender')
const { SendGridProvider } = require('mail-template-sender/providers')


// Adding SendGrid Provider
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(/* Send Grid Key */)
const sgProvider = new SendGridProvider(sgMail);


// Create MailerTemplateSetup
const mailerOptions = {
  provider: sgProvider,
  templateDir: path.join(__dirname, 'templates')
}
const mailer = MailerTemplateSetup.config(mailerOptions)


// Create mail object
const mailOptions = {
  template: 'verification',
  to: 'youremail@gmail.com',
  from: 'myemail@gmail.com',
  subject: 'From My Mailer',
}
const mail = new Mail(mailOptions)


// Add template data
mail.addData({ user: 'Bla' })


// Send mail
mailer.mailSender.send(mail)

```

### Configuring mail-template-sender

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
<br><br/>
## MailTemplateSender

- `onError(cb)`: This method recieves a callback to handle what happens when a mail fails to send

  - `cb`: this must be a callback eg. `cb  = (error, mail) => {}`

------
- `onSent(cb)`: This method recieves a callback to handle what happens when a mail is sent successfully

  - `cb`: this must be a callback eg. `cb = (mail, result) => {}`

<br><br>
## Mail Class

- `addData(data)`: This method is used to add the data that used inside the ejs template

  - `data`: this must be an Object
---
- `addSubject(data)`: Adds the subject to the mail(although it can be added during mail creation)

  - `data`: this must be string
----
- `addTo(data)`: Adds the reciever to the mail(although it can be added during mail creation)

  - `data`: this must be string
----
- `addFrom(data)`: Adds the sender to the mail(although it can be added during mail creation). Use the email address or domain you verified

  - `data`: this must be string

<br></br>
## Provider

The provides provided for you are

- `SendGridProvider`
- `NodeMailerProvider`

These are classes that can be used as provider. You can create you own provider by extending the `Provider` class

i.e

```js
const Provider = require("mail-template-sender/core/Provider");
class NewProvider extends Provider {
  // implement the send()
  // Note: The `body` and `mail` are defaultly provided
}
```

<br></br>
## Implementing A different template Engine

Coming Soon
<br></br>
<br></br>
## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

[Obisike Treasure](https://github.com/Otrex) ([obisiket@gmail.com](mailto:obisiket@gmail.com))
