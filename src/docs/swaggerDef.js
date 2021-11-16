const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: `${config.appname}`,
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/fabio-anzola/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `${config.base}/v1`,
    },
  ],
};

module.exports = swaggerDef;
