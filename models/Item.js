var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Item Model
 * ==========
 */

var Item = new keystone.List('Item', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Item.add({
	title: { type: String, required: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, default: Date.now },
	images: { type: Types.CloudinaryImages },
	price: { type: Number, default: 0 },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	sale: { type: Types.Boolean },
	categories: { type: Types.Relationship, ref: 'ItemCategory', many: false },
	subcategories: { type: Types.Relationship, ref: 'ItemSubCategory', many: false },
	brand: { type: Types.Relationship, ref: 'Brand', many: false },
	views: { type: Number, default: 0 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
});

Item.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Item.defaultColumns = 'title, publishedDate|20%';
Item.register();
