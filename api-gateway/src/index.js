require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || 'http://localhost:3002';
const PORT = process.env.GATEWAY_PORT || 8080;

app.use('/auth', createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/auth': '' },
}));

app.use('/data', createProxyMiddleware({
  target: DATA_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/data': '' },
}));

app.get('/', (req, res) => res.send('API Gateway up and running'));

app.listen(PORT, () => console.log(`Gateway listening on port ${PORT}`));
