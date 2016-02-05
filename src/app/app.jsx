import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';


console.log('toggle todo');

const toggleTodo = (todo) => {
  // mutating
  // todo.completed = true;
  // todo.completed = !todo.completed;  // better!
  // return todo;


}

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false,
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true,
  };

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter)

  console.log('testToggleTodo passed')

};

testToggleTodo();
