var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Item Sub Category Model
 * ==================
 */

var ItemSubCategory = new keystone.List('ItemSubCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ItemSubCategory.add({
	name: { type: String, required: true },
	category: { type: Types.Relationship, ref: 'ItemCategory', many: false },
});

ItemSubCategory.relationship({ ref: 'Item', path: 'items', refPath: 'subcategories' });

ItemSubCategory.register();
