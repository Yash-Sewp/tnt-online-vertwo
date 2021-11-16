var keystone = require('keystone');
const { reject } = require('lodash');

var Item = keystone.list('Item');
/**
 * List Files
 */
exports.list = function (req, res) {
	Item.model.find(function (err, items) {
		if (err) return res.apiError('database error', err);

		res.apiResponse({
			collections: items,
		});
	});
};

exports.fetchBrand = function (req, res) {
	Item.model.find()
		.where('brand', req.params.id)
		.exec(function (err, items) {
			if (err) return reject(err);
			return res.apiResponse({
				collections: items,
			});
		});
};

exports.fetchCategory = function (req, res) {
	Item.model.find()
	.where('categories', req.params.id)
	.exec(function(err, items) {
		if (err) return reject(err);
		return res.apiResponse({
			collections: items,
		});
	});
};
/**
 * Upload a New File
 */
exports.create = function (req, res) {
	var item = new Item.model(),
		data = req.method == 'Item' ? req.body : req.query;

	item.getUpdateHandler(req).process(req.body, function (err) {
		if (err) return res.apiError('error', err);

		res.apiResponse({
			Item: item,
		});
	});
};

/**
 * Delete File by ID
 */
exports.remove = function (req, res) {
	var ItemId = req.params.id;
	Item.model.findById(req.params.id).exec(function (err, item) {
		if (err) return res.apiError('database error', err);

		if (!item) return res.apiError('not found');

		item.remove(function (err) {
			if (err) return res.apiError('database error', err);

			return res.apiResponse({
				success: true,
			});
		});
	});
};

/**
 * Update File by ID
 */
exports.update = function (req, res) {
	Item.model.findById(req.params.id).exec(function (err, item) {
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		var data = req.method == 'Item' ? req.body : req.query;
		console.log(data);
		item.getUpdateHandler(req).process(data, function (err) {
			if (err) return res.apiError('create error', err);

			res.apiResponse({
				collection: item,
			});
		});
	});
};

/**
 * Add for views
 */
exports.addview = function (req, res) {
	Item.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		var id = req.params.id;

		Item.model.update({ _id: id }, {
			$inc: { views: 1 }
		}).exec(function (err, response) {
			if (err) {
				if (err) return res.apiError('error', err);
			} else {
				console.log("this here " + response);
				var responseObject = {
					status: 'success'
				};
				res.status(200).send(responseObject);
			}
		})
	});
};

