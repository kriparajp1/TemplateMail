const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const templatePath = path.join(__dirname, "sndmail.html");
const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

function replacePlaceholders(template, replacements) {
    for (const [key, value] of Object.entries(replacements)) {
        template = template.replace(new RegExp(key, "g"), value);
    }
    return template;
}

const login = (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        req.session.userMail = email;
        req.session.userPassword = password;

        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
};

const postMail = (req, res) => {
    console.log('Session data:', req.session);
    const { email, subject, content, heading } = req.body;

    const userMail = req.session.userMail;
    const userPassword = req.session.userPassword;
    console.log(`User email: ${userMail}, User password: ${userPassword}`);

    if (!userMail || !userPassword) {
        return res.status(401).json({ success: false, message: "Session expired or invalid" });
    }

    sendMail(userMail, userPassword, email, subject, content, heading);

    res.status(200).json({ success: true, message: "Email sent successfully" });
};

const sendMail = (userMail, userPassword, recipientEmail, subject, content, heading) => {
    console.log(`${userMail}      and ${userPassword}`)
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: userMail,
            pass: userPassword,
        },
        tls: {
            ciphers: 'SSLv3',
        },
    });

    let replacements = {
        "hello": subject,
        "heading": heading,
        "hope": content
    };

    let htmlContent = replacePlaceholders(htmlTemplate, replacements);

    const mailOptions = {
        from: userMail,
        to: recipientEmail,
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
    login,
    postMail
};
