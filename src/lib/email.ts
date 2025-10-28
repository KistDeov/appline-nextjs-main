import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// Replace with your SMTP credentials
const smtpPort = parseInt(process.env.EMAIL_SERVER_PORT || "2525", 10);
// If port 465 is used assume secure (SMTPS). Allow override via env var EMAIL_SERVER_SECURE='true'|'false'.
const smtpSecure =
  typeof process.env.EMAIL_SERVER_SECURE !== "undefined"
    ? process.env.EMAIL_SERVER_SECURE === "true"
    : smtpPort === 465;

const smtpOptions = {
  host: process.env.EMAIL_SERVER_HOST,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    ...data,
  });
};
