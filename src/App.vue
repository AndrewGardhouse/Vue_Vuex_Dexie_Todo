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
    <count></count>
    <hr>
    <ul>
      <todo v-for="todo in todos" :todo="todo"></todo>
    </ul>
  </div>
</template>

<script>
import { fetchAllTodos, addTodo, markAllCompleted, deleteAllTodos } from './vuex/actions.js'
import Todo from './Todo.vue'
import Count from './Count.vue'

export default {
  components: {
    Todo,
    Count
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
