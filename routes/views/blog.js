var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category,
		brand: req.params.brand,
	};
	locals.data = {
		items: [],
		categories: [],
		brand: [],
		page: [],
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('ItemCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Item').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.itemCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});

		keystone.list('Brand').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.brand = results;

			// Load the counts for each category
			async.each(locals.data.brand, function (brand, next) {

				keystone.list('Item').model.count().where('brand').in([brand.id]).exec(function (err, count) {
					brand.itemCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});

		keystone.list('Page').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.page = results;

			// Load the counts for each category
			async.each(locals.data.page, function (page, next) {

				keystone.list('Item').model.count().where('brand').in([page.id]).exec(function (err, count) {
					page.itemCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('ItemCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}

		if (req.params.brand) {
			keystone.list('Brand').model.findOne({ key: locals.filters.brand }).exec(function (err, result) {
				locals.data.brand = result;
				next(err);
			});
		} else {
			next();
		}

		if (req.params.page) {
			keystone.list('Page').model.findOne({ key: locals.filters.page }).exec(function (err, result) {
				locals.data.page = result;
				next(err);
			});
		} else {
			next();
		}

	});

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Item').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories brand');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		if (locals.data.brand) {
			q.where('brand').in([locals.data.brand]);
		}

		q.exec(function (err, results) {
			locals.data.items = results;
			next(err);
		});
	});

	// Render the view
	view.render('blog');
};
