import {createStore} from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';


const counter = (state = 0, action)=> {
  switch (action.type) {
    case 'INCREMENT':
    return state + 1;
    case 'DECREMENT':
    return state - 1;
    default:
    return state;
  }
}
//const {createStore} = redux;
const store = createStore(counter);

const Counter = ({
  value,
  onIncrement,
  onDecrement,
}) => (
  <div>
    <button onClick = {onIncrement}>+</button>
    <h1>{value}</h1>
  </div>
);



const render = () => {
  ReactDOM.render(
    <Counter
      value = {store.getState()}
      onIncrement = {() => {
        store.dispatch ({
          type:'INCREMENT',
        })
      }}
      />,
    document.querySelector('#app')
  )
}

store.subscribe(render);
render();

//with dummy callback, page is not re-rendered.
//store.subscribe(() => {});
//render();
