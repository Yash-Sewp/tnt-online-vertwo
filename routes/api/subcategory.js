var keystone = require('keystone');

var SubCategory = keystone.list('ItemSubCategory');
/**
 * List Files
 */
exports.list = function (req, res) {
	SubCategory.model.find(function (err, items) {
		if (err) return res.apiError('database error', err);

		res.apiResponse({
			collections: items,
		});
	});
};


