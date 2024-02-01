const isProduction = process.env.NODE_ENV === 'production';

const domain = 'bmrk.cc';
const local = 'localhost:3000';
const home = isProduction ? domain : local;
const protocol = isProduction ? 'https://' : 'http://';

export const urls = {
  homeWithoutProtocol: home,
  home: `${protocol}${home}`,
  authCallback: `${protocol}app.${home}/auth/callback/`,
  account: `${protocol}app.${home}/account`,
  app: `${protocol}app.${home}`,
  api: `${protocol}${home}`,
  twitter: 'https://twitter.com/gokul_i',
  github: 'https://github.com/gokulkrishh/bmrk.cc',
};
