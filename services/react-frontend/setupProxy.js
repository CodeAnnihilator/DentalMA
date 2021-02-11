const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('node', { target: 'http://localhost:9000/' }));
	app.use(proxy('ocr', { target: 'http://localhost:5000/' }));
}