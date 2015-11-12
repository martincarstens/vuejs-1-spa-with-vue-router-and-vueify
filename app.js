var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(require('vue-router'));

new Vue({
	el: '#nav',
	data: {
		hellothere: 'Hello :)'
    }
})

var toDo = require('./components/todo.vue');

var newPage = Vue.extend({
    template: '<p>This is a new page.</p>'
})

// The router needs a root component to render.
// For demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
var App = Vue.extend({})

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter()

// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
router.map({
    '/todo': {
        component: toDo
    },
    '/newpage': {
        component: newPage
    }
})

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')

$(window).on('hashchange', function(e){
	if (window.location.hash == '#!/todo') {
		$(".navbar-nav li").removeClass();
		$(".navbar-nav #to-do").addClass("active");
	}
	else {
		$(".navbar-nav li").removeClass();
		$(".navbar-nav #new-page").addClass("active");
	}
});