var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Page.add({
	title: { type: String, required: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	images: { type: Types.CloudinaryImages },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	subheading: {
		content: {
			title: { type: String },
		},
	},
	printers: {
		content: {
			title: { type: String },
			brief: { type: Types.Html, wysiwyg: true, height: 150 },
			extended: { type: Types.Html, wysiwyg: true, height: 400 },
		},
	},
	repairs: {
		content: {
			title: { type: String },
			brief: { type: Types.Html, wysiwyg: true, height: 150 },
			extended: { type: Types.Html, wysiwyg: true, height: 400 },
		},
	},
	parts: {
		content: {
			title: { type: String },
			brief: { type: Types.Html, wysiwyg: true, height: 150 },
			extended: { type: Types.Html, wysiwyg: true, height: 400 },
		},
	},
	installations: {
		content: {
			title: { type: String },
			brief: { type: Types.Html, wysiwyg: true, height: 150 },
			extended: { type: Types.Html, wysiwyg: true, height: 400 },
		},
	},
});

Page.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Page.defaultColumns = 'title, publishedDate|20%';
Page.register();
