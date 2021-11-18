var keystone = require('keystone');

/**
 * Item Sub Category Model
 * ==================
 */

var ItemSubCategory = new keystone.List('ItemSubCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ItemSubCategory.add({
	name: { type: String, required: true },
});

ItemSubCategory.relationship({ ref: 'Item', path: 'items', refPath: 'subcategories' });

ItemSubCategory.register();
