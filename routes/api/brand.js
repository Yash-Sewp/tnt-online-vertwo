var keystone = require('keystone');

var Brand = keystone.list('Brand');
/**
 * List Files
 */
exports.list = function (req, res) {
	Brand.model.find(function (err, items) {
		if (err) return res.apiError('database error', err);

		res.apiResponse({
			collections: items,
		});
	});
};


