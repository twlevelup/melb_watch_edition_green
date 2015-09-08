var Config = {};

if (process.env.NODE_ENV === 'production') {
  Config.firebaseUrl = 'https://watch-levelup-green.firebaseio.com';
} else {
  Config.firebaseUrl = 'https://watch-levelup-green.firebaseio.com';
}

module.exports = Config;
