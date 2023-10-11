import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer';
import { envConfig } from './config';

// Create Nodemailer transporter
const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: envConfig.MAILER_AUTH_USER,
    pass: envConfig.MAILER_AUTH_PASSWORD,
  },
});

const sendEmail = async (message: SendMailOptions): Promise<SentMessageInfo> => {
  try {
    const info = await transporter.sendMail(message);
    return info;
  } catch (error) {
    throw error;
  }
};

const sendVerifyEmail = async (
  targetMail: string,
  redirectUrl: string,
  verificationString: string,
): Promise<SentMessageInfo | Error> => {
  const message: SendMailOptions = {
    from: envConfig.MAILER_AUTH_USER,
    to: targetMail,
    subject: 'Please verify your email',
    text: `
        Thanks for signing up! To verify your email, click here:
        ${redirectUrl}/${verificationString}
    `,
  };

  try {
    const info: SentMessageInfo = await sendEmail(message);
    return info;
  } catch (error) {
    return error;
  }
};

const sendResetPasswordEmail = async (
  targetMail: string,
  redirectUrl: string,
  verificationString: string,
): Promise<SentMessageInfo | Error> => {
  const message: SendMailOptions = {
    from: envConfig.MAILER_AUTH_USER,
    to: targetMail,
    subject: 'Password Reset',
    text: `
        To reset your email, click here:
        ${redirectUrl}/${verificationString}
    `,
  };

  try {
    const info: SentMessageInfo = await sendEmail(message);
    return info;
  } catch (error) {
    return error;
  }
};

export { sendEmail, sendVerifyEmail, sendResetPasswordEmail };
