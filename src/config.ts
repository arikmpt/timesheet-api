const config = {
  saltRound: 10,
  jwtSecret: process.env.JWT_SECRET,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  appUrl: process.env.APP_URL || 'http://localhost:3000/'
};

export default config;
