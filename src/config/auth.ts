const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET,
  },
  user: {
    expiresIn: '2d',
  },
};

export default authConfig;
