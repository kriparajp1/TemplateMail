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
        console.log("Login Request Body:", req.body);

        // Store credentials in session
        req.session.userMail = email;
        req.session.userPassword = password;

        console.log("Session after login:", req.session);

        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        console.log("Login Error:", error);
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
};

const postMail = (req, res) => {
    // Retrieve credentials from session
    const userMail = "kripp.me@outlook.com";
    const userPassword = "kichu@347";
    
    console.log("Session in postMail:", req.session);

    if (!userMail || !userPassword) {
        return res.status(400).json({ success: false, message: "User credentials missing" });
    }

    const { email, subject, content, heading } = req.body;
    console.log("Sending Email To:", email);

    sendMail(userMail, userPassword, email, subject, content, heading);

    res.status(200).json({ success: true, message: "Email sent successfully" });
};

const sendMail = (userMail, userPassword, recipientEmail, subject, content, heading) => {
    console.log("Sending Mail With User:", userMail, userPassword);

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
            console.log("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

module.exports = {
    login,
    postMail
};

// Server setup code remains the same
