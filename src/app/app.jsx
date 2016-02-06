import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';


console.log('toggle todo');

const toggleTodo = (todo) => {
  // mutating
  //todo.completed = true;
  // todo.completed = !todo.completed;  // better!
  // return todo;

  // non-mutating option 1:  create new object
  // but might forget to include some fields.
  // return {
  //   id: todo.id,
  //   text: todo.text,
  //   completed: !todo.completed,
  // }

  // non-mutating option 2: ES6 object.assign()
  return Object.assign({}, todo, {
    completed: !todo.completed,
  });

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

  deepFreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter)

  console.log('testToggleTodo passed')

};

testToggleTodo();
