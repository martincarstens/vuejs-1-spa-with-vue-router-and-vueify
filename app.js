var Vue = require('vue');

Vue.component('todo', require('./components/todo.vue') )
Vue.component('page1', { template: '<p>This is a new page.</p>' })
var app = new Vue({
  el: '#app',
  data: {
    currentView: 'todo'
  },
  methods: {
  	switchPage: function(page) {
  		history.pushState({id: '123'}, '', page);
  		app.currentView = page;
  	}
  }
})
// Switching pages in your route handler:
app.currentView = 'todo'


$(window).on('hashchange', function(e){
	if (window.location.pathname == '/vue/todo') {
		$(".navbar-nav li").removeClass();
		$(".navbar-nav #to-do").addClass("active");
	}
	else {
		$(".navbar-nav li").removeClass();
		$(".navbar-nav #new-page").addClass("active");
	}
});