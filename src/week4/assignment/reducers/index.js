import { combineReducers } from 'redux';
import { todo } from './todoReducer';

const reducers = combineReducers({
    todo
});

export default reducers;
