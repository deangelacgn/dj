import dotenv from 'dotenv';

dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const connectionString = process.env.CONNECTION_STRING;
export const jwtSecretKey = process.env.JWT_SECRET_KEY;
export const jwtExpiration = process.env.JWT_EXPIRATION;
export const nodeMailerEmail = process.env.NODEMAILER_EMAIL;
export const nodeMailerPassword = process.env.NODEMAILER_PASSWORD;
export const resetPasswordPage = process.env.RESET_PASSWORD_PAGE;