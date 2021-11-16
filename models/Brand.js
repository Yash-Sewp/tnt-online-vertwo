var keystone = require('keystone');

/**
 * Brand Model
 * ==================
 */

var Brand = new keystone.List('Brand', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Brand.add({
	name: { type: String, required: true },
});

Brand.relationship({ ref: 'Item', path: 'items', refPath: 'brand' });

Brand.register();
