<template>
  <div>
    <h5>Completed Todos: {{ completedTodos.length }} </h5>
    <button type="button" name="markAll" v-on:click="markAllCompleted">Mark All Completed</button>
    <button type="button" name="deleteAll" v-on:click="deleteAllTodos">Delete All</button>
  </div>
</template>

<script>
import { markAllCompleted, deleteAllTodos } from './vuex/actions.js'

export default {
  vuex: {
    getters: {
      completedTodos: store => store.todos.filter((todo) => {
        return todo.done === true
      })
    },
    actions: {
      markAllCompleted,
      deleteAllTodos
    }
  }
}
</script>

<style>

</style>
