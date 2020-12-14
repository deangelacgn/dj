import { userModel, secretCodeModel } from '../models';
import nodemailer from 'nodemailer';
import { nodeMailerEmail, nodeMailerPassword, resetPasswordPage } from '../settings';
import fs from 'fs';

export const generateSecretCode = () => {
  const secretCode = Math.floor(100000 + Math.random() * 900000);
  return secretCode;
};

export const sendEmailForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const data = await userModel.select(
      'name, email',
      ' WHERE email = $1',
      [email],
    );

    const [userData] = data.rows;
    if (userData === undefined) {
      return res.status(404).json({ message: "Input user email has not been registered!" });
    }

    const transporter = await nodemailer.createTransport({
      host: "gmail",
      auth: {
        user: nodeMailerEmail,
        pass: nodeMailerPassword,
      },
    });

    const secretCode = generateSecretCode();

    await secretCodeModel.addSecretCode(secretCode);

    let emailTemplate = fs.readFileSync('./src/templates/forgotPasswordEmail.html', 'utf-8');
    emailTemplate = emailTemplate.replace("{USERNAME}", userData.name);
    emailTemplate = emailTemplate.replace("{SECRETCODE}", secretCode);
    emailTemplate = emailTemplate.replace("{RESET_PASSWORD_PAGE}", resetPasswordPage);

    const changePassCodeInfo = await transporter.sendMail({
      from: `DJ Comércio <${nodeMailerEmail}>`,
      to: email,
      subject: "Código para troca de senha - DJ comércio",
      text: `Seu código secreto para trocar de senha é: ${secretCode}`,
      html: emailTemplate,
    });

    console.log("Email sent: %s", changePassCodeInfo.messageId);

    return res.status(204).end();
  } catch(error) {
    next(error);
  }
};