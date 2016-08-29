<template>
  <li class="todo">
    <div v-if="!edited">
      <p v-bind:class="{ 'done' : todo.done }" class="fw-normal fs-large">
        {{ todo.text }}
      </p>
      <button type="button" name="button" v-on:click="toggleTodo(todo)">{{ todoStatus() }}</button>
      <button type="button" name="delete" v-on:click="deleteTodo(todo)">Delete</button>
      <button type="button" name="edit" v-on:click="toggleEditField()" v-if="!todo.done">Edit</button>
    </div>
    <div v-else>
      <label for="text" class="textfield">
        <input type="text" name="text" v-model="todoText" v-bind:value="todo.text">
        <span class="textfield__label">Edit Todo</span>
      </label>
      <button v-on:click="editCurrentTodo">Edit Todo</button>
    </div>
  </li>
  <hr>
</template>

<script>
import { editTodo, toggleTodo, deleteTodo } from './vuex/actions.js'

export default {
  props: ['todo'],
  data () {
    return {
      edited: false,
      todoText: ''
    }
  },
  vuex: {
    actions: {
      toggleTodo,
      editTodo,
      deleteTodo
    }
  },
  methods: {
    todoStatus () {
      return this.todo.done ? 'Mark As Undone' : 'Mark As Done'
    },
    editCurrentTodo (e) {
      if (this.todoText.trim()) {
        this.editTodo(this.todo, this.todoText)
        this.edited = false
      }
    },
    toggleEditField () {
      this.edited = !this.edited
    }
  }
}
</script>

<style>
</style>
