const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/images',
    createProxyMiddleware({
      target: 'https://https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo.s3.ap-southeast-1.amazonaws.com',
      changeOrigin: true,
    })
  );
//   app.use(
//     '/images/img',
//     createProxyMiddleware({
//       target: 'https://tlluploaddocument.s3.ap-southeast-1.amazonaws.com',
//       changeOrigin: true,
//     })
//   );

};