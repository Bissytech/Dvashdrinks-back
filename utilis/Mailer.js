const nodemailer = require("nodemailer")


const welcomemail = async (email, firstname) => {

    const messageTemplate = `
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title> Welcome to Dvash- We are thrilled to have you!!!</title>
        <style>
            {
            body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 0;   
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
            }
            .header {
                background-color: #4CAF50;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            .thefooter {
                background-color: #f1f1f1;
                color: #777;
                text-align: center;
                padding: 10px;
                font-size: 12px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 10px 0;
                font-size: 16px;
                color: #ffffff;
                background-color: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
            }
            .button:hover {
                background-color: #45a049;
            }
            }
        </style>
    </head>
    <body>

    <div class="container">
<div class="header">
    <h1>We're happy to have you.</h1>
</div>
<div class="content">
    <p>Hi ${firstname},</p>
    <p>We believe you're going to love everything we offer, from delicious and healthy natural fresh drinks, swift delivery and exclusive member benefits.</p>
   <p> Here's how to get started:</p>
<ol>
<li>Explore Our Products: Check out our wide range of [e.g., fresh juices, healthy parfaits] and discover your favorites.<li/>
<li>Enjoy Member Perks: As a valued member, you’re eligible for [e.g., exclusive discounts, personalized offers, etc.].<li/>
<li>Stay Connected: Follow us on social media to get the latest updates and special offers.<li/>
<ol/>
   <p>We’re here to make your experience amazing. If you have any questions or need assistance, don’t hesitate to reach out.


   <p>Thank you for joining us! We can’t wait for you to experience everything [Your Website Name] has to offer.<p/><p/>
</div>
<div>
<p>Warmest Welcome,<p/>
<p>TheDvash Team<p/>
${process.env.mail}

</div>
</div>
    </body>
    </html>

    `


    const transporter = nodemailer.createTransport(
        {
            service: "gmail",
            auth: {
                user: process.env.mail,
                pass: process.env.password
            }
        }
    )

    const Mailoptions = {
        from: process.env.mail,
        to: email,
        subject: "Welcome",
        text: "Welcome to Dvash!",
        html: messageTemplate
    }
    try {
        const sendmail = await transporter.sendMail(Mailoptions)
        if (sendmail) {
            console.log("mail sent successfuly");
        }
    } catch (error) {
        console.log(error);
    }
}








// const myotp = async (email, otp, firstname) => {

//     const messageTemplate2 = `
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8"/>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//         <title>Welcome to Our Service!</title>
//         <style>
//             {
//             body {
//                 font-family: Arial, sans-serif;
//                 color: #333;
//                 margin: 0;
//                 padding: 0;
//                 background-color: #f4f4f4;
//             }
//             .container {
//                 width: 100%;
//                 max-width: 600px;
//                 margin: 0 auto;
//                 background-color: #ffffff;
//                 border-radius: 8px;
//                 overflow: hidden;
//             }
//             .header {
//                 background-color: #4CAF50;
//                 color: #ffffff;
//                 padding: 20px;
//                 text-align: center;
//             }
//             .content {
//                 padding: 20px;
//             }
//             .footer {
//                 background-color: #f1f1f1;
//                 color: #777;
//                 text-align: center;
//                 padding: 10px;
//                 font-size: 12px;
//             }
//             .button {
//                 display: inline-block;
//                 padding: 10px 20px;
//                 margin: 10px 0;
//                 font-size: 16px;
//                 color: #ffffff;
//                 background-color: #4CAF50;
//                 text-decoration: none;
//                 border-radius: 5px;
//             }
//             .button:hover {
//                 background-color: #45a049;
//             }
//             }
//         </style>
//     </head>
//     <body>

//     <div class="container">
// <div class="header">
// <h2> Hi ${firstname},</h2>
// </div>
// <div class="content">
//     <p>We received a request to reset the password for your FootFaves account. Please use the One-Time Password (OTP) below to proceed with resetting your password</p>
//     <h2>Your OTP : ${otp}</h2>
//     <p>This OTP is valid for the next 2 minutes. If you did not request a password reset, please ignore this email. Your account remains secure, and no changes will be made.</p>
//     <p>For more enquiries, feel free to contact our support team at ${process.env.MAIL}</p>
//     <p>Best regards,<br>Footaves Team</p>
// </div>
// <div class="footer">
//     <p>&copy; 2024 FootFaves. All rights reserved.</p>
//     <p>shop 18 ,heritage mall dugbe ibadan</p>
// </div>
// </div>
//     </body>
//     </html>

//     `
//     console.log(email);
//     const transporter = nodemailer.createTransport(
//         {
//             service: "gmail",
//             auth: {
//                 user: process.env.MAIL,
//                 pass: process.env.password
//             }
//         }
//     )

//     const Mailoptions = {
//         from: process.env.MAIL,
//         to: email,
//         subject: "FootFaves OTP VERIFICATION",
//         text: `Dear ${firstname}. Verify the OTP to proceed reseting your password,`
//         html: messageTemplate2
//     }
//     try {
//         const sendmail = await transporter.sendMail(Mailoptions)
//         if (sendmail) {
//             console.log("mail sent successfuly");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }


module.exports = { welcomemail }
