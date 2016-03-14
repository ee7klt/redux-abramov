import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';
import {createStore} from 'redux';
//import {combineReducers} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';

const todo = (state = {} ,action) => {
  switch (action.type) {

    case 'ADD_TODO':
    return {
      id: action.id, text: action.text, completed: false,
    };

    case 'TOGGLE_TODO':
    if (state.id !== action.id) {
      return state;
    }
    return {
      ...state, completed: !state.completed,
    };

    default:
    return state;

  }

}

// reducer: pure function that takes previous state of application
// and action being dispatched
// and returns the next state of the app
// todos: reducer
// state: previous state (initialized to [] if undefined)
// action: action being dispatched. plain JS object. must have 'type' property
const todos = (state=[], action) =>{

  switch (action.type) {
    case 'ADD_TODO':
    console.log('ADD_TODO switch selected')
    return [
      ...state,
      todo(undefined,action),
    ];

    case 'TOGGLE_TODO':
    console.log('TOGGLE_TODO switch selected')

    return state.map( t => todo(t, action))

    default:
    console.log('default switch selected')
    return state;
  }
}

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}



const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce( (nextState,key)  => {
      nextState[key] = reducers[key](state[key],action);
      return nextState;
    }, {})
  }
}

// todoApp is still a reducer
// so it'll have to take arguments (state, action)
// combineReducers returns a reducer function.
const todoApp = combineReducers({
  todos,
  visibilityFilter,
})

let nextTodoId = 0;
let arr = ['a','b','c'];

class TodoApp extends Component {

  render() {
    console.log(this.props.todos[0])
    return (
      <div>
        <input ref = {node => {
            this.input = node;
          }} />
        <button onClick = {() => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++,
            });
            this.input.value='';
          }}>Add Todo</button>
        <ul>
          {this.props.todos.map(todo => {
            return <li key = {todo.id}>
              {todo.text}
            </li>
          })}
        </ul>
      </div>
    )
  }
}

const store = createStore(todoApp);

const render = () => {
  console.log("render triggered")
  ReactDOM.render(
    <TodoApp todos = {store.getState().todos}/>,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();





const testTodoApp = () => {
  const stateBefore = {
    todos: [{id: 0, text:'Learn Redux', completed: false}],
    visibilityFilter: 'SHOW_ALL',
  };

  // action is an object. with a defined type property.
  const action = {
    type: 'ADD_TODO',
    id: 1,
    text: 'Go shopping',
  };

  const stateAfter = {
    todos: [{id: 0, text:'Learn Redux', completed: false},
            {id: 1, text:'Go shopping', completed: false},
            ],
    visibilityFilter: 'SHOW_ALL',
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todoApp(stateBefore, action)
  ).toEqual(stateAfter);
  console.log("Test passed: todoApp")

}

testTodoApp();
