module.exports = [
  {
    promptId: 1,
    description: 'it should add two positive numbers',
    arguments: '2, 2',
    expectedOutput: 4
  }, {
    promptId: 1,
    description: 'it should add two negative numbers',
    arguments: '-2, -2',
    expectedOutput: -4
  }, {
    promptId: 2,
    description: 'it should multiply one negative and one positive number',
    arguments: '-5, 5',
    expectedOutput: -25
  }, {
    promptId: 2,
    description: 'it should multiply two positive numbers',
    arguments: '2, 4',
    expectedOutput: 8
  }, {
    promptId: 3,
    description: 'it should return even for an even number',
    arguments: '10',
    expectedOutput: 'Even'
  }, {
    promptId: 4,
    description: 'it should return a blank array for an array with no strings',
    arguments: '[1,2,{}]',
    expectedOutput: '[]'
  },
  {
    promptId: 4,
    description: 'it should return an array with two strings',
    arguments: '[`coffee`, 10, {}, `shoe`]',
    expectedOutput: '[`coffee`, `shoe`]'
  },
  {
    promptId: 5,
    description: 'it should return the index of target in the input array',
    arguments: '[`a`,`b`,`c`,`d`,`e`,`f`,`g`], `f`',
    expectedOutput: '5'
  },
  {
    promptId: 5,
    description: 'it should return the index of target in the input array',
    arguments: '[`a`,`b`,`c`,`d`,`e`,`f`,`g`], `a`',
    expectedOutput: '0'
  }
];













