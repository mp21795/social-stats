module.exports = function (app) {
	app.use(function (req, res, next) {
	  console.log('Time:', Date.now());
	  next();
	});

	app.get('/path', (req, res) => res.send('Social Stats - path!'))
};
