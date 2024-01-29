const isProduction = process.env.NODE_ENV === 'production';

const domain = 'bmrk-cc.vercel.app';
const local = 'localhost:3000';
const home = isProduction ? domain : local;
const protocol = isProduction ? 'https://' : 'http://';

export const urls = {
  homeWithoutApp: home,
  home: `${protocol}${home}`,
  authCallback: `${protocol}${home}/auth/callback`,
  app: `${protocol}${home}/app`,
  twitter: 'https://twitter.com/gokul_i',
  github: 'https://github.com/gokulkrishh/bmrk.cc',
};
