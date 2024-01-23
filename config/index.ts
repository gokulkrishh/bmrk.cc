const isProduction = process.env.NODE_ENV === 'production';

const production = 'https://bmrk.cc';
const local = 'http://localhost:3000';
const home = isProduction ? production : local;

const config = {
  home,
};

export default config;
