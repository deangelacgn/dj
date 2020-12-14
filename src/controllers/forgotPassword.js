import { userModel, secretCodeModel } from '../models';
import nodemailer from 'nodemailer';
import { nodeMailerEmail, nodeMailerPassword, resetPasswordPage } from '../settings';
import fs from 'fs';
import bcrypt from 'bcrypt';

export const generateSecretCode = () => {
  const secretCode = Math.floor(100000 + Math.random() * 900000);
  return secretCode;
};

export const sendEmailForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const data = await userModel.select(
      'id, name, email',
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
    const expirationDate = new Date(Date.now() + 600000);

    await secretCodeModel.addSecretCode([secretCode, userData.id, expirationDate]);

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

export const resetPassword = async (req, res, next) => {
  try {
    const { secret_code, new_password } = req.body;

    let data = await secretCodeModel.select('user_id, code', 'WHERE code = $1', [secret_code]);
    const [codeData] = data.rows;
    
    if(codeData === undefined) {
      return res.status(400).json({ message: "Invalid secret code!" });
    }

    const passwordHash = bcrypt.hash(new_password, 10);

    data = await userModel.updatePassword(codeData.user_id, passwordHash);

    return res.status(200).json("Successfully updated password!");
  } catch (error) {
    next(error);
  }
};