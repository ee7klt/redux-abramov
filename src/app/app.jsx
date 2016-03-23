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
    console.log('TOGGLE_TODO switch selected ',action.id)

    return state.map( t => todo(t, action))

    default:
    console.log('TODOS: default switch selected')
    return state;
  }
}


const AddTodo = ({
  onAddClick,
}) => {
  let input;
  return <div>
    <input ref = {node => {
        input = node;
      }} />

      <button onClick = {() => {
          onAddClick(input.value)
          input.value='';
        }}>Add Todo</button>

      </div>
    }

    const visibilityFilter = (
      state = 'SHOW_ALL',
      action
    ) => {
      switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
        console.log('filter is now ', action.filter)
        return action.filter;
        default:
        return state;
      }
    }



    // a single filter link
    // omit value name 'filter' because of es6 object literal shorthand
    // filter: SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE
    // children: All, Completed, Active
    // filter, children are destructured props (see 0.14 changelog)
    const FilterLink = ({
      filter,
      children,
      currentFilter,
      onClick,
    }) => {

      if (filter === currentFilter) {
        return (
          <span>
            {children}
          </span>
        )
      }
      else return (
        <a href='#' onClick = { e => {
            e.preventDefault();
            onClick(filter)
          }
        }

        >{children}</a>
    )
  }

  // return the filterlinks presentational component

  const Footer = ({
    visibilityFilter,
    onClick,
  }) => {
    return   <p>
      Show:
      {'  '}
      <FilterLink onClick = {onClick} filter = 'SHOW_ALL' children = 'All' currentFilter = {visibilityFilter} />
      {'  '}
      <FilterLink onClick = {onClick} filter = 'SHOW_COMPLETED' children = 'Completed'  currentFilter = {visibilityFilter} />
      {'  '}
      <FilterLink onClick = {onClick} filter = 'SHOW_ACTIVE' children = 'Active'  currentFilter = {visibilityFilter} />
    </p>
  }

  // Todo presentational component
  // onClick is left general
  const Todo = ({
    onClick,
    completed,
    text,
  }) => {
    console.log(text);
    return <li onClick = {onClick}
      style = {{
        textDecoration:
        completed ? 'line-through' : 'none',
      }}>
      {text}
    </li>
  };


  // List of todos presentational component
  // pass in id of todo for onClick event to toggle completion
  const TodoList = ({
    todos,
    onTodoClick,
  }) => {
    console.log('TodoList presentational component');
    return <ul>
      {todos.map(todo => {
        return <Todo
          key = {todo.id}
          {...todo}
          onClick = {() => onTodoClick(todo.id)}
          />
      })}
    </ul>

  };
  // filter out the visibile todos based on visibilityFilter state

  const getVisibleTodos = (todos, filter) => {
    switch (filter) {
      case 'SHOW_ALL':
      console.log('getting ALL todos')
      return todos
      case 'SHOW_COMPLETED':
      console.log('getting COMPLETED todos')
      return todos.filter(t => {
        return t.completed
      })
      case 'SHOW_ACTIVE':
      console.log('getting ACTIVE todos')
      return todos.filter(t => {return !t.completed})
      default:
      return todos;
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

  const log = () => {
    console.log('rendering...');
  }

  let nextTodoId = 0;
  const TodoApp = ({
    todos,
    visibilityFilter,
  }) => {
    return <div>
      <AddTodo onAddClick = {
          input => {
            store.dispatch({
              type:'ADD_TODO',
              text: input,
              id: nextTodoId++,
            })
          }
        }/>

        <TodoList
          todos = {getVisibleTodos(
            todos,
            visibilityFilter
          )}
          onTodoClick = {(id) => {
            store.dispatch(
              {
                type: 'TOGGLE_TODO',
                id,
              }
            )
          }}
          />

        <Footer
          visibilityFilter = {visibilityFilter}
          onClick = {(filter) => {
            store.dispatch({
              type:'SET_VISIBILITY_FILTER',
              filter,
            })
          }}
          />
      </div>
    }

    const store = createStore(todoApp);

    const render = () => {
      //console.log("render triggered")
      ReactDOM.render(
        <TodoApp
          {...store.getState()}
          />,
        document.getElementById('root')
      );
    };

    store.subscribe(render);
    render();


    const testGetVisibleTodos = () => {
      const todos =  [
        {id: 0, text:'Learn Redux', completed: false},
        {id: 0, text:'Learn Relay', completed: true},
      ]

      const  filtered = [{id: 0, text:'Learn Relay', completed: true}]

      deepFreeze(todos);
      expect(getVisibleTodos(todos, 'SHOW_COMPLETED'))
      .toEqual(filtered);
      console.log('getVisibleTodos passed')

    }
    testGetVisibleTodos();


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
