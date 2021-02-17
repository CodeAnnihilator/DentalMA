const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('node', { target: 'http://0.0.0.0:9000/' }));
	app.use(proxy('ocr', { target: 'http://0.0.0.0:5000/' }));
}