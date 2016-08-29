<template>
  <div id="app" class="wrapper-small">
    <h4 class="ta-center fw-semibold">
      Todo List:
      <br>
      Vue + Vuex + IndexedDB
    </h4>
    <label for="name" class="textfield">
      <input type="text" name="name" @keyup.enter="addNewTodo">
      <span class="textfield__label">Add Todo</span>
    </label>
    <div v-if="todos.length > 0">
      <h5>Completed Todos: {{ completedTodos.length }} </h5>
      <button type="button" name="markAll" v-on:click="markAllCompleted">Mark All Completed</button>
      <button type="button" name="deleteAll" v-on:click="deleteAllTodos">Delete All</button>
    </div>    
    <hr>
    <ul>
      <todo v-for="todo in todos" :todo="todo"></todo>
    </ul>
  </div>
</template>

<script>
import { fetchAllTodos, addTodo, markAllCompleted, deleteAllTodos } from './vuex/actions.js'
import Todo from './Todo.vue'

export default {
  components: {
    Todo
  },
  vuex: {
    getters: {
      todos: store => store.todos,
      completedTodos: store => store.todos.filter((todo) => {
        return todo.done === true
      })
    },
    actions: {
      addTodo,
      fetchAllTodos,
      markAllCompleted,
      deleteAllTodos
    }
  },
  ready () {
    this.fetchAllTodos()
  },
  methods: {
    addNewTodo (e) {
      let text = e.target.value
      console.log(text)
      if (text.trim()) {
        this.addTodo(text)
      }
      e.target.value = ""
    }
  }
}
</script>

<style>
button {
  height: 3.8rem !important;
  line-height: 3.8rem !important;
  padding: 0 1rem !important;
}
ul {
  margin: 0;
}
.todo {
  list-style: none;
}
p {
  word-break: break-all;
}
.done {
  text-decoration: line-through;
}
</style>
