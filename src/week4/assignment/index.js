import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import TodoStack from "./TodoStack";

const store = createStore(reducers);

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <TodoStack />
            </Provider>
        );
    }
}