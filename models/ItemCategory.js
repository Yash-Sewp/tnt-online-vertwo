var keystone = require('keystone');

/**
 * ItemCategory Model
 * ==================
 */

var ItemCategory = new keystone.List('ItemCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ItemCategory.add({
	name: { type: String, required: true },
});

ItemCategory.relationship({ ref: 'Item', path: 'items', refPath: 'categories' });

ItemCategory.register();
