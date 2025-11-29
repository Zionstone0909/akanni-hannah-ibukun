'use server'

import nodemailer from "nodemailer";

export async function sendMail(name: string, email: string, message: string) {
    try {
        let mailTransporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // SSL
            auth: {
                user: process.env.ZOHO_USER,
                pass: process.env.ZOHO_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const mailDetails = {
            from: process.env.ZOHO_USER,
            to: "hannahakanni7@gmail.com",   // ✅ UPDATED RECEIVER EMAIL
            subject: `Contact form submission from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
            replyTo: email, // ensures replies go to the sender
        };

        await mailTransporter.sendMail(mailDetails);

        return { success: true, message: "Email sent successfully" };

    } catch (error) {
        console.error("Error occurred while sending email:", error);
        return { success: false, message: "Error occurred while sending email" };
    }
}
