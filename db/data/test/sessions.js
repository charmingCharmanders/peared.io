const date = new Date();
const datePlus15Mins = new Date(date.getTime() + (15 * 60 * 1000));

module.exports = [
  {
    profileId1: 1,
    profileId2: 2,
    promptId: 1,
    solutionCode: 'const addTwoNumbers = function (a, b) { return a + b; }',
    startedAt: date,
    endedAt: datePlus15Mins
  }
];
