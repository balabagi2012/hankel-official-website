import nodemailer from "nodemailer";
let client: nodemailer.Transporter;

export function connectToMailServer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_ACCOUNT, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_ACCOUNT || !SMTP_PASSWORD) {
    throw new Error("No SMTP env variable found");
  } else {
    if (!client) {
      client = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT), // Convert port to number
        auth: {
          user: SMTP_ACCOUNT,
          pass: SMTP_PASSWORD,
        },
      });
    }
  }

  return client;
}
