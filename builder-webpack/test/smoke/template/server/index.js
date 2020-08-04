const express = require('express');
const path = require('path');
const fs = require('fs');

const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
if (typeof window === 'undefined') {
  global.window = {};
}
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server');
const renderMarkup = (str) => {
  console.log(str);
  return template.replace('<!--HTML_PLACEHOLDER-->', str);
};
const server = (port) => {
  const app = express();
  app.use(express.static('dist'));
  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    console.log('html', html);
    console.log(renderToString(SSR));
    res.status(200).send(html);
  });
  app.listen(port, () => {
    console.log('server start');
  })
};
server(process.env.PORT || 3000);
