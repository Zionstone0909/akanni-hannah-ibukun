'use server'

import nodemailer from "nodemailer";

export async function sendMail(name: string, email: string, message: string) {
    try {
        // Nodemailer transport setup for Zoho Mail
        let mailTransporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // Use SSL/TLS
            auth: {
                user: process.env.ZOHO_USER, // Sender email defined in .env
                pass: process.env.ZOHO_PASS, // App password defined in .env
            },
            // Note: tls.rejectUnauthorized: false is generally used for self-signed certs. 
            // While common in development, ensure it's not masking a configuration issue.
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Email content details
        const mailDetails = {
            from: process.env.ZOHO_USER,
            to: "hannahakanni7@gmail.com", 
            subject: `Contact form submission from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
            replyTo: email, // Ensures replies go back to the original sender
        };

        await mailTransporter.sendMail(mailDetails);

        return { success: true, message: "Email sent successfully" };

    } catch (error) {
        console.error("Error occurred while sending email:", error);
        return { success: false, message: "Error occurred while sending email" };
    }
}