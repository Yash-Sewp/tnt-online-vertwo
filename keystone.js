// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var env = require('dotenv').config();
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'tntonline',
	'brand': 'tntonline',
	'cookie secret': process.env.COOKIE_SECRET || '6afd4e75ca446dc5c18276747c828493645d96a1abb8169aa013e9a34347e2884c899319cc6ef244b80c0a9e2055bfacb72a5c0717959d26943ccfd0b91d03eb',
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',
	'cloudinary config': process.env.CLOUDINARY_URL || 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'mongo': process.env.MONGO_URI || 'mongodb://localhost/tn-t-online',

});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['items', 'item-categories', 'item-sub-categories', 'brands'],
});

// Start Keystone to connect to your database and initialise the web server



keystone.start();
