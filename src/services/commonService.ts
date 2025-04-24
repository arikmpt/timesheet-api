import nodemailer from 'nodemailer';

import config from '@/config';

interface SendEmail {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: config.smtpHost,
  port: config.smtpPort,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPassword
  }
});

const sendEmail = async (data: SendEmail) => {
  await transporter.sendMail({
    from: process.env.SMTP_SENDER,
    to: data.to,
    subject: data.subject,
    html: data.html
  });
};

const generateRandomPassword = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  return Array.from(array, (x) => chars[x % chars.length]).join('');
};

export { transporter, sendEmail, generateRandomPassword };
