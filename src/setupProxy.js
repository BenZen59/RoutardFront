const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/api ': '' },
      devServer: {
        allowedHosts: [
          'localhost', // Laissez localhost pour le développement local
        ],
      },
    })
  );
};
