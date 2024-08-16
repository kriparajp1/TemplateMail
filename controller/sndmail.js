const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const templatePath = path.join(__dirname, "portfolio.html");
const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
const renderPage=(req,res)=>{
  try {
    res.render("subject")
  } catch (error) {
    console.log(error)
  }
}

function replacePlaceholders(template, replacements) {
  for (const [key, value] of Object.entries(replacements)) {
    template = template.replace(new RegExp(key, "g"), value);
  }
  return template;
}

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', 
  port: 587, 
  secure: false, 
  auth: {
    user: 'kripp.me@outlook.com', 
    pass: 'Kichu@347', 
  },
  tls: {
    ciphers: 'SSLv3',
  },
});







const postMail = async (req, res) => {
  try {
    const { subject, email, content,heading } = req.body;

    sendSuccesfullMail(email, subject, content,heading);
    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
};
const sendSuccesfullMail = (email, content, heading,subject) => {
  
  let replacements = {
    "hello":subject,
    "heading":heading,
    "hope":content
  };

  let htmlContent = replacePlaceholders(htmlTemplate, replacements);
  const mailOptions = {
    from: "kripp.me@outlook.com",
    to: email,
    subject: subject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = {
  renderPage,postMail
};
