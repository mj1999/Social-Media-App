const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "project.acc.1.gm",
    pass: "project.acc.random.pass",
  },
});

let renderTemplate = function (data, relativePath) {
  let mailHtml;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error rendering template", err);
      }
      mailHtml = template;
    }
  );
  return mailHtml;
};

module.exports = {
  transporter,
  renderTemplate,
};
