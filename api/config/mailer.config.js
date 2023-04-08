const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mtorganizator@gmail.com",
    pass: process.env.NODEMAILER_PASSWORD
  }
});

module.exports.sendConfirmationEmail = (player) => {
  transporter.sendMail({
    from: "Admin <mtorganizator@gmail.com>",
    to: player.email,
    subject: "Welcome to MT Organizator",
    text: "",
    html: `
      <div style="display:flex;justify-content:center;">
        <h1>Welcome to MT Organizator!</h1>
        <a href="${process.env.API_URL}/register/${player.id}/confirm">Click here to confirm the account!</a>
      </div>
    `
  })
  .then((res) => console.info(res))
  .catch((error) => console.error(error))
}

