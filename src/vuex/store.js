import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  todos: []
}

const mutations = {
  FETCH_ALL_TODOS (state, todos) {
    state.todos = todos
  },
  ADD_TODO (state, text, id) {
    state.todos.unshift({
      _id: id,
      text: text,
      done: false
    })
  },
  EDIT_TODO (state, todo, text) {
    todo.text = text
  },
  TOGGLE_TODO (state, todo) {
    todo.done = !todo.done
  },
  DELETE_TODO (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  MARK_ALL_COMPLETED (state) {
    state.todos.filter((todo) => {
      todo.done = true
    })
  }
}

export default new Vuex.Store({
  state,
  mutations
})
