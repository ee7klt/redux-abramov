import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';



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
      todo({},action),
    ];

    case 'TOGGLE_TODO':
    console.log('TOGGLE_TODO switch selected')

    return state.map( t => todo(t, action))

    default:
    console.log('default switch selected')
    return state;
  }
}



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




testAddTodo();
testToggleTodo();
