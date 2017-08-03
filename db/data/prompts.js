module.exports = [
  {
    name: 'Add Two Numbers',
    description: 'Write a function that returns the sum of 2 numbers.',
    category: 'Math',
    hint: 'Use Addition.',
    skeletonCode: 'const addTwoNumbers = function (a, b) { }',
    solutionCode: 'const addTwoNumbers = function (a, b) { return a + b; }',
    userId: 1,
    difficulty: 3
  },
  {
    name: 'Multiply Two Numbers',
    description: 'Return the product of two numbers',
    category: 'Multiplication',
    hint: 'Use math.',
    skeletonCode: 'const multiplyTwoNumbers = function (a, b) { }',
    solutionCode: 'const multiplyTwoNumbers = function (a, b) { return a * b; }',
    userId: 2,
    difficulty: 3
  },
  {
    name: 'Even or Odd',
    description: 'Return `Even` if the argument is an even number, return `Odd` if an odd number.',
    category: 'If/else statements',
    hint: 'Use the remainder operator.',
    skeletonCode: 'const evenOrOdd = function (a) { }',
    solutionCode: 'const evenOrOdd = function (a) { if (a%2 === 0) {return `Even`} else if (a%2 === 1) {return `Odd`} }',
    userId: 3,
    difficulty: 3
  },
  {
    name: 'Only Strings',
    description: 'Given an array of strings, numbers and objects, return the input array with only its strings.',
    category: 'For loop',
    hint: 'Loop through the array and use typeof to test the data type of each element.',
    skeletonCode: 'const arrayOfStrings = function (array) { }',
    solutionCode: 'const arrayofStrings = function(array) { let result = []; for (var i = 0; i < array.length; i++) { if (typeof array[i] === `string`) { result.push(array[i]) } } return result }',
    userId: 4,
    difficulty: 3
  },
  {
    name: 'Find index of x in an array',
    description: 'Given a target value and an array, return the index of the target in the array.',
    category: 'Indexes of Arrays',
    hint: 'Use the indexOf() method in the Object prototype.',
    skeletonCode: 'const findIndexOfTarget = function (target, array) { }',
    solutionCode: 'const findIndexOfTarget = function (target, array) { return array.indexOf(target); }',
    userId: 4,
    difficulty: 3
  },
  {
    name: 'Balanced Parens',
    description: 'write a function that takes a string of text and returns true if the parentheses are balanced and false otherwise. Example:  balancedParens("(");  // false,   balancedParens("()"); // true,  balancedParens(")(");  // false',
    category: 'String Manipulation',
    hint: 'Check all types of brackets.',
    skeletonCode: 'const balancedParens = function (target, array) { }',
    solutionCode: 'const balancedParens = function (target, array) {   var stack = []; var pairs = {`{`: `}`,`[`: `]`,`(`:`)`};for (var i = 0; i < input.length; i++) {var chr = input[i];if (pairs[chr]) {stack.push(chr);} else if (chr === `}` || chr === `]` || chr === `)`) {if (pairs[stack.pop()] !== chr) {return false;}}}return stack.length === 0; }',
    userId: 3,
    difficulty: 3
  },
  {
    name: 'Binary Search Array',
    description: 'Given a sorted array, find the index of an element using a binary search algorithm.Example usage: var index = binarySearch([1, 2, 3, 4, 5], 4); console.log(index); // 3; var index = binarySearch([1, 2, 3, 4, 5], 8); console.log(index); // null',
    category: 'Trees',
    hint: 'User Recursion.',
    skeletonCode: 'const binarySearchArray = function () { }',
    solutionCode: 'const binarySearchArray = function () { }',
    userId: 3,
    difficulty: 3
  }
];


// {
//     name: 'Balanced Parens',
//     description: 'Write a function that takes a string of text and returns true if the parentheses are balanced and false otherwise.',
//     category: 'Strings',
//     hint: 'Make your solution work for all types of brackets',
//     skeletonCode: 'const balancedParams = function () { }',
//     solutionCode: 'const balancedParams = function () { }',
//     rating: null
//   }, {
//     name: 'Binary Heap',
//     description: 'A heap is a special kind of tree in which a parent node is ordered only in respect to its immediate children.',
//     category: 'Data Structures',
//     hint: 'In a binary heap each node should have only zero, one, or two children.',
//     skeletonCode: 'const binaryHeap = function () { }',
//     solutionCode: 'const binaryHeap = function () { }',
//     rating: null
//   }, {
//     name: 'Binary Search Array',
//     description: 'Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum velit id ullamcorper lobortis. Fusce egestas ac diam sed finibus.',
//     category: 'Searching',
//     hint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum velit id ullamcorper lobortis. Fusce egestas ac diam sed finibus.',
//     skeletonCode: 'const binarySearchArray = function () { }',
//     solutionCode: 'const binarySearchArray = function () { }',
//     rating: null
//   }, {
//     name: 'Bubble Sort',
//     description: 'Bubble sort is the most basic sorting algorithm in all of Computer Sciencedom. It works by starting at the first element of an array and comparing it to the second element; if the first element is greater than the second element, it swaps the two.',
//     category: 'Sorting',
//     hint: 'It then compares the second to the third, and the third to the fourth, and so on; in this way, the largest values bubble to the end of the array.',
//     skeletonCode: 'const bubbleSort = function () { }',
//     solutionCode: 'const bubbleSort = function () { }',
//     rating: null
//   }, {
//     name: 'Compose Pipe',
//     description: 'Compose should return a function that is the composition of a list of functions of arbitrary length.',
//     category: 'Functions',
//     hint: 'Each function is called on the return value of the function that follows.',
//     skeletonCode: 'const composePipe = function () { }',
//     solutionCode: 'const composePipe = function () { }',
//     rating: null
//   }, {
//     name: 'Deep Equality',
//     description: 'Write a function that, given two objects, returns whether or not the two are deeply equivalent--meaning the structure of the two objects is the same, and so is the structure of each of their corresponding descendants.',
//     category: 'Recursion',
//     hint: 'Don\'t worry about handling cyclical object structures.',
//     skeletonCode: 'const deepEquality = function () { }',
//     solutionCode: 'const deepEquality = function () { }',
//     rating: null
//   }, {
//     name: 'Even Occurrence',
//     description: 'Find the first item that occurs an even number of times in an array.',
//     category: 'Arrays',
//     hint: 'Remember to handle multiple even-occurrence items and return the first one.',
//     skeletonCode: 'const evenOccurrence = function () { }',
//     solutionCode: 'const evenOccurrence = function () { }',
//     rating: null
//   }, {
//     name: 'Hash Table',
//     description: 'Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.',
//     category: 'Data Structures',
//     hint: 'The hashtable does not need to resize but it should still handle collisions.',
//     skeletonCode: 'const hashTable = function () { }',
//     solutionCode: 'const hashTable = function () { }',
//     rating: null
//   }, {
//     name: 'Insertion Sort',
//     description: 'Insertion sort iterates over an array, growing a sorted array behind the current location.',
//     category: 'Sorting',
//     hint: 'It takes each element from the input and finds the spot, up to the current point, where that element belongs. It does this until it gets to the end of the array.',
//     skeletonCode: 'const insertionSort = function () { }',
//     solutionCode: 'const insertionSort = function () { }',
//     rating: null
//   }