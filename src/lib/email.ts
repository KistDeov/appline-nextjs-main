type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// Lazy-load nodemailer inside the function to avoid import-time errors
// and to prevent bundling server-only modules into places where they
// aren't available (for example if a module is accidentally imported
// on the client).
export const sendEmail = async (data: EmailPayload) => {
  const nodemailer = (await import("nodemailer")).default;

  const smtpPort = parseInt(process.env.EMAIL_SERVER_PORT || "2525", 10);
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

  if (!smtpOptions.host) {
    throw new Error("Missing EMAIL_SERVER_HOST environment variable");
  }

  if (!process.env.EMAIL_FROM) {
    throw new Error("Missing EMAIL_FROM environment variable");
  }

  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    ...data,
  });
};
