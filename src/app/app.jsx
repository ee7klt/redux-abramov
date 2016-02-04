
import expect, { createSpy, spyOn, isSpy } from 'expect';
import deepFreeze from 'deep-freeze';

const addCounter = (list) => {
  return [...list, 0];
};

const removeCounter = (list, index) => {

// spread operator more concise
return [
  ...list.slice(0, index),
  ...list.slice(index+1),
]

  // return list
  // .slice(0,index)
  // .concat(list.slice(index+1));
};

const incrementCounter = (list,index) => {

  return [
    ...list.slice(0, index),
    list[index]+1,
    ...list.slice(index+1),
  ]

// list[index]++    // this is mutating

  // return list
  // .slice(0,index)
  // .concat([list[index] + 1])
  // .concat(list.slice(index+1))
}

const testAddCounter =() => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);


  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
  console.log('testAddCounter passed.')

};


const testRemoveCounter = () => {
  const listBefore =[0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
  console.log('testRemoveCounter passed.')
}


const testIncrementCounter = () => {
  const listBefore =[0, 10, 20];
  const listAfter = [0, 11,20];

  deepFreeze(listBefore);

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);

  console.log('testIncrementCounter passed.');
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('All tests passed.');
