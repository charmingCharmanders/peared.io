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
    expectedOutput: '"Even"'
  },
  {
    promptId: 4,
    description: 'it should return the index of target in the input array',
    arguments: '["a","b","c","d","e","f","g"], "f"',
    expectedOutput: '5'
  },
    {
    promptId: 4,
    description: 'it should return the index of target in the input array',
    arguments: '["a","b","c","d","e","f","g"], "a"',
    expectedOutput: '0'
  },
  {
    promptId: 5,
    description: 'it should return true if parens are balanced',
    arguments: '"[](){}"',
    expectedOutput: 'true'
  },
  {
    promptId: 5,
    description: 'it should return false if parens are not balanced',
    arguments: '"[(]{)}"',
    expectedOutput: 'false'
  },
  {
    promptId: 6,
    description: 'it should return the index of target in the input array',
    arguments: '[1, 2, 3, 4, 5], 4',
    expectedOutput: '3'
  },
  {
    promptId: 6,
    description: 'it should return null if target is not in array',
    arguments: '[1, 2, 3, 4, 5], 8',
    expectedOutput: 'null'
  },
  {
    promptId: 7,
    description: 'it should return the correct letters in order',
    arguments: '"mississippi"',
    expectedOutput: '[["i", 4],["s", 4],["p", 2],["m", 1]]'
  },
  {
    promptId: 7,
    description: 'it should return the correct letters in order',
    arguments: '"mmmaaaiiibbb"',
    expectedOutput: '[["a", 3],["b", 3],["i", 3],["m", 3]]'
  },
  {
    promptId: 8,
    description: 'it should return the possible ways to give change for 250',
    arguments: '250',
    expectedOutput: '200187'
  },
  {
    promptId: 8,
    description: 'it should return the possible ways to give change for 55',
    arguments: '55',
    expectedOutput: '600'
  }
];













