import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';


// reducer: pure function that takes previous state of application
// and action being dispatched
// and returns the next state of the app
// todos: reducer
// state: previous state (initialized to [] if undefined)
// action: action being dispatched. plain JS object. must have 'type' property
const todos = (state=[], action) =>{

  switch (action.type) {
    case 'ADD_TODO':
    return [
      ...state,
      {id: action.id, text: action.text, completed: false},
    ];
    case 'TOGGLE_TODO':
    return [
      ...state, {state[action.id]}
    ];
    default:
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
  const stateBefore = [{id: 0, text: 'Learn Redux', completed: false}];
  const stateAfter =  [{id: 0, text: 'Learn Redux', completed: true}];

  const action = {
    type: 'TOGGLE_TODO',
  }

  expect(
    todos(stateBefore, action)
  ).toEqual(stateBefore);


  console.log("Test passed: TOGGLE_TODO")

}




testAddTodo();
testToggleTodo();
