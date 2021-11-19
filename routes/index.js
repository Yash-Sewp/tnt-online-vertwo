/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};


// Setup Route Bindings
exports = module.exports = function (app) {

	app.use('*', function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
		next();
	});

	app.options('*', function (req, res) {
		res.status(200).send();
	});

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/item/:item', routes.views.item);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);

	// Apis
	app.get('/allitem', keystone.middleware.api, routes.api.item.list);
	app.get('/allcategories', keystone.middleware.api, routes.api.category.list);
	app.get('/allsubcategories', keystone.middleware.api, routes.api.subcategory.list);
	app.get('/allbrand', keystone.middleware.api, routes.api.brand.list);
	app.get('/pages', keystone.middleware.api, routes.api.page.list);

	app.get('/update/:id', keystone.middleware.api, routes.api.item.addview)
	
	app.get('/brand/:id', keystone.middleware.api, routes.api.item.fetchBrand);
	app.get('/category/:id', keystone.middleware.api, routes.api.item.fetchCategory);
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
