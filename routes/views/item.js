var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		item: req.params.item,
	};
	locals.data = {
		items: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Item').model.findOne({
			state: 'published',
			slug: locals.filters.item,
		}).populate('author categories brand');

		q.exec(function (err, result) {
			locals.data.item = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Item').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.items = results;
			next(err);
		});

	});

	// Render the view
	view.render('item');
};
