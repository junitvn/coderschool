export const ADD_TODO = 'ADD_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function editTodo(item, index) {
  return { type: EDIT_TODO, item, index }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}
