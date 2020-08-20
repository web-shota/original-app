(function(){
  'use strict'
  
  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: [],
      errors: [],
      task: null
    },
    watch: {
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      checkForm: function (e) {
        this.errors = [];
        
        if (!this.task) {
          this.errors.push("入力されていません。");
        }
      },
      addItem: function() {
        var item = {
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index) {
        if (confirm('削除してよろしいですか？')) {
          this.todos.splice(index, 1);
        }
      },
      purge: function() {
        if (!confirm('削除してよろしいですか？')) {
          return;
        }
        this.todos = this.remaining;
      }
    },
    computed: {
      remaining: function() {
        return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      }
    }
  });
  
});