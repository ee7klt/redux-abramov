const React = require('react');
import expect, { createSpy, spyOn, isSpy } from 'expect';


export default class Counter extends React.Component {


  a = () => {
    alert('hello')
  }

  counter = (state,action) => {
    if (action.type === 'INCREMENT') {
      return state+1;
    } else if (action.type === 'DECREMENT') {
      return state-1;
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
    return <div>
      <h1>Counter</h1>
      <button onClick = {() => this.a()}>alert hello</button>
    </div>
  }

}
