var keystone = require('keystone');

var Page = keystone.list('Page');

exports.list = function (req, res) {
	Page.model.find(function (err, items) {
		if (err) return res.apiError('database error', err);

		res.apiResponse({
			collections: items,
		});
	});
};
