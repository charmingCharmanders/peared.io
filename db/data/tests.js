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
    expectedOutput: -20
  }, {
    promptId: 2,
    description: 'it should multiply two positive numbers',
    arguments: '2, 4',
    expectedOutput: 8
  }, {
    promptId: 3,
    description: 'it should return even for an even number',
    arguments: '10',
    expectedOutput: true
  }, {
    promptId: 3,
    description: 'it should return odd for an odd number',
    arguments: '3',
    expectedOutput: false
  }
];
