import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'soyansoon9@gmail.com',
        pass: 'zwlo shhu cqgx maqy',
    },
});

app.post('/api/enroll', async (req, res) => {
    const { name, language, phone, course } = req.body;

    const mailOptions = {
        from: 'soyansoon9@gmail.com',
        to: 'karzanjabar@gmail.com',
        subject: `New Enrollment: ${course}`,
        text: `
      New enrollment request received:
      
      Course: ${course}
      Name: ${name}
      Phone: ${phone}
      Preferred Language: ${language}
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log('Received contact request:', { name, email, subject });

    const mailOptions = {
        from: 'soyansoon9@gmail.com',
        to: 'karzanjabar@gmail.com',
        subject: `Contact Form: ${subject}`,
        text: `
      New message from contact form:
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `,
    };

    try {
        console.log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('CRITICAL ERROR sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

app.post('/api/newsletter', async (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: 'soyansoon9@gmail.com',
        to: 'karzanjabar@gmail.com',
        subject: `Newsletter Subscription`,
        text: `
      New newsletter subscription:
      
      Email: ${email}
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
