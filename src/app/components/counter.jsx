const React = require('react');
import expect, { createSpy, spyOn, isSpy } from 'expect';


export default class Counter extends React.Component {


  a = () => {
    alert('hello')
  }

  counter = (state = 0,action) => {
    switch (action.type) {
      case 'INCREMENT':
      return state + 1;
      case 'DECREMENT':
      return state - 1;
      default:
      return state;
    }
  }

  testCounter = (current,next,type) => {
    console.log(current,next,type)
    expect(
      this.counter(current, {'type':type})
    ).toEqual(next);
  }





  render () {
    this.testCounter(0,1,'INCREMENT');
    this.testCounter(2,1,'DECREMENT');
    this.testCounter(1,1,'UNKNOWN');
    this.testCounter(undefined,0,);
    return <div>
      <h1>Counter</h1>
      <button onClick = {() => this.a()}>alert hello</button>
    </div>
  }

}
