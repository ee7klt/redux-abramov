import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';
import {createStore} from 'redux';
import {combineReducers} from 'redux';



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

// combineReducers should return a reducer
//  that takes state and action arguments
//  that returns a state with keys corresponding to keys in 'reducers'
//  and each key assigned the result of executing sub-reducers of the same name on the state, action arguments
// const combineReducers  = (reducers) => {
//    return (state,action) => {
//     let temp = {};
//     for (let i in reducers) {
//       temp[i] =  reducers[i](state,action)
//     }
//     return temp;
//
//   }
// }





//
// const a = (x) => x+1
// const b = (x) => x+2
// const q = combineReducers2({a,b});
// console.log(q(1,2));


// todoApp is still a reducer
// so it'll have to take arguments (state, action)
// combineReducers returns a reducer function.
const todoApp = combineReducers({
  todos,
  visibilityFilter,
})



const store = createStore(todoApp);


// console.log('Initial state:');
// console.log(store.getState());
// console.log('----------');
//
// console.log('Dispatching ADD_TODO:');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'Learn Redux',
// });
//
// console.log('Current state');
// console.log(store.getState());
// console.log('----------');
//
// console.log('Dispatching ADD_TODO:');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 1,
//   text: 'Go shopping',
// });
//
// console.log('Current state');
// console.log(store.getState());
// console.log('----------');
//
//
//
// console.log('Dispatching SET_VISIBILITY_FILTER');
// store.dispatch({
//   type:'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED',
// });
// console.log('Current state');
// console.log(store.getState());
// console.log('----------');
//
// // the following causes error with my combineReducers
// // state.map is not a function
//
// console.log('Dispatching TOGGLE_TODO:');
// store.dispatch({
//   type: 'TOGGLE_TODO',
//   id:0,
// });
//
// console.log('Current state');
// console.log(store.getState());
// console.log('----------');


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

  //console.log(action.type)
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

const testAddTodo = () => {
  const stateBefore = [];

  // action is an object. with a defined type property.
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux',
  };

  //console.log(action.type)
  const stateAfter = [{id: 0, text:'Learn Redux', completed: false}];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
  console.log("Test passed: ADD_TODO")

}

const testToggleTodo = () => {
  const stateBefore = [
    {id: 0, text: 'Learn React', completed: false},
    {id: 1, text: 'Learn Redux', completed: false},
    {id: 2, text: 'Learn Relay', completed: false},
  ];
  const stateAfter = [
    {id: 0, text: 'Learn React', completed: false},
    {id: 1, text: 'Learn Redux', completed: true},
    {id: 2, text: 'Learn Relay', completed: false},
  ];

  const action = {
    type: 'TOGGLE_TODO',
    id:1,
  }

  //console.log(todos(stateBefore,action)[0])
  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

  const action2 = {
    type: 'TOGGLE_TODO',
    id:4,
  }

  expect(
    todos(stateBefore,action2)
  ).toEqual(stateBefore)





  console.log("Test passed: TOGGLE_TODO")

}




//testAddTodo();
//testToggleTodo();

// console.log(store.subscribe)
//
// for(let prop in store) {
//     if (store.hasOwnProperty(prop)) {
//         // handle prop as required
//         console.log(prop)
//     }
// }
