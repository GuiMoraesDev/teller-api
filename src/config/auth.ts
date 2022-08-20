const authConfig =  {
  jwt: {
    secret: process.env.APP_SECRET,
  },
  user: {
    expiresIn: '15d',
  },
};

export default authConfig;