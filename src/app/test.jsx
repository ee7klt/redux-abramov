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
