const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
          target: 'https://housing-api.stag.mpao.mv',
          changeOrigin: true,
        })
      );
};