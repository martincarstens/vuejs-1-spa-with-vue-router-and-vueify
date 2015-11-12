// todo.vue
<template>

	<div id="tasks">

	    <!-- The Form to Add a New Task -->
	    <form v-on:submit="addTask">
	        <div class="form-group">
	            <input v-model="newTask"
	                   v-el="newTask"
	                   class="form-control"
	                   placeholder="I need to..."
	                   v-on:keyup.enter="addTask"></input>
	        </div>

	        <button class="btn btn-primary">
	            Add Task
	        </button>

	        <button v-on:click="completeAll"
	                class="btn btn-default"
	        >
	            Mark All As Completed?
	        </button>
	    </form>


	    <!-- The List of Todos -->
	    <div v-show="remaining.length">
	        <h1>Tasks ({{ remaining.length }})</h1>

	        <ol class="list-group">
	            <li v-for="task in remaining"
	                class="list-group-item"
	            >
	                <span v-on:dblclick="editTask(task)">{{ task.body }}</span>

	                <button v-on:click="removeTask(task)">&#10007;</button>
	                <button v-on:click="toggleTaskCompletion(task)">&#10004</button>
	            </li>
	        </ol>
	    </div>


	    <!-- The List of Completed Tasks -->
	    <div v-if="completions.length">
	        <h2>Completed ({{ completions.length }})</h2>

	        <ol class="list-group">
	            <li v-for="task in completions"
	                class="list-group-item"
	            >
	                {{ task.body }}

	                <button v-on:click="toggleTaskCompletion(task)">&#10007;</button>
	            </li>
	        </ol>

	        <button v-on:click="clearCompleted" class="btn btn-danger">Clear Completed</button>
	    </div>
	    
	    <br />
	    <pre>{{$data | json}}</pre>

	</div>

</template>

<script>

module.exports = {

	data: function () {
		return {		
			tasks: [],
		    newTask: '',

		    filters: {
		        inProcess: function(task) {
		            return ! task.completed;
		        },

		        completed: function(task) {
		            return task.completed;
		        }
		    }
	    }
	},
	computed: {
	    completions: function() {
	        return this.tasks.filter(this.filters.completed);
	    },

	    remaining: function() {
	        return this.tasks.filter(this.filters.inProcess);
	    }
	},

	methods: {
	    addTask: function(e) {
	    	console.log(this.$parent.$options);
	        e.preventDefault();

	        if ( ! this.newTask) return;

	        this.tasks.push({
	            body: this.newTask,
	            completed: false
	        });

	        this.newTask = '';
	    },

	    editTask: function(task) {
	        this.removeTask(task);
	        this.newTask = task.body;

	        this.$$.newTask.focus();
	    },

	    toggleTaskCompletion: function(task) {
	        task.completed = ! task.completed;
	    },

	    completeAll: function() {
	        this.tasks.forEach(function(task) {
	            task.completed = true;
	        });
	    },

	    clearCompleted: function() {
	        this.tasks = this.tasks.filter(this.filters.inProcess);
	    },

	    removeTask: function(task) {
	        this.tasks.$remove(task);
	    }
	}

}



</script>