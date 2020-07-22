import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, EDIT_TODO } from "../actions/todoAction";

const initialState = {
    visibilityFilter: 'SHOW_ALL',
    todos: [
        {
            text: 'Consider using Redux',
            completed: true
        },
        {
            text: 'Keep all state in a single tree',
            completed: false
        }
    ]
}

export const todo = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }]
            }

        case EDIT_TODO:
            console.log('édit reducer', action.item, action.index);
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index) => {
                    if (index === action.index) {
                        return Object.assign({}, todo, {
                            text: action.item.text
                        })
                    }
                    return todo
                })
            })
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index) => {
                    if (index === action.index) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            })

        default:
            return state;
    }
}