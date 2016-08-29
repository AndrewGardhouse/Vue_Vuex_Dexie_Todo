import Dexie from 'dexie'

const db = new Dexie('todos')

db.version(1).stores({
  todos: '_id, text, done'
})

export const fetchAllTodos = ({ dispatch }) => {
  db.todos.orderBy('_id').reverse().toArray((todos) => {
    dispatch('FETCH_ALL_TODOS', todos)
  })
}

export const addTodo = ({ dispatch }, text) => {
  db.todos.add({
    _id: String(Date.now()),
    text: text,
    done: false
  }).then(function(id) {
    dispatch('ADD_TODO', text, id)
  })
}

export const editTodo = ({ dispatch }, todo, text) => {
  db.todos.update(todo._id, {
    text: text
  }).then((updated) => {
    if (updated) {
      dispatch('EDIT_TODO', todo, text)
    } else {
      console.log('NOT UPDATED');
    }
  }).catch((error) =>{
    console.log(error);
  })
}

export const toggleTodo = ({ dispatch }, todo) => {
  db.todos.update(todo._id, {
    done: !todo.done
  }).then((updated) => {
    if (updated) {
      dispatch('TOGGLE_TODO', todo)
    } else {
      console.log('NOT UPDATED');
    }
  }).catch((error) =>{
    console.log(error);
  })
}

export const deleteTodo = ({dispatch}, todo) => {
  if (db.todos.delete(todo._id)) {
    dispatch('DELETE_TODO', todo)
  }
}

export const markAllCompleted = ({ dispatch }) => {
  db.todos.toArray((todos) => {
    todos.forEach((todo) => {
      db.todos.update(todo._id, {done: true})
    })
    dispatch('MARK_ALL_COMPLETED')
  })
}

export const deleteAllTodos = ({ dispatch }) => {
  db.todos.orderBy('_id').delete().then((deleteCount) => {
    console.log(`Deleted ${deleteCount} Todos`);
    dispatch('DELETE_ALL_TODOS')
  });
}
