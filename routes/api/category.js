var keystone = require('keystone');

var Category = keystone.list('ItemCategory');
/**
 * List Files
 */
exports.list = function (req, res) {
	Category.model.find(function (err, items) {
		if (err) return res.apiError('database error', err);

		res.apiResponse({
			collections: items,
		});
	});
};


