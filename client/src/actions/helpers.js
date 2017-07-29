module.exports.calculateSessionScore = (timeLimitInSeconds, promptTime, promptDifficulty, tests, testsPassed) => {
  let diffObj = {1: 10, 2: 50, 3: 250, 4: 1000};
  let percentageOfTimeLimit = (timeLimitInSeconds - (promptTime)) / timeLimitInSeconds;
  let score = ((percentageOfTimeLimit * .40) + .60) * diffObj[promptDifficulty] * (testsPassed / tests);
  if (promptDifficulty === 1) {
    return score;
  } else {
    return score - (score % 5);
  }
};

module.exports.generateNewTime = (hours, minutes, seconds) =>{
  // console.log('the minutes:', minutes);
  if (parseInt(seconds) < 59) {
    return `${hours}:${minutes}:${incrementTimeUnits(seconds)}`;
  } else if (parseInt(minutes) < 59) {
    return `${hours}:${incrementTimeUnits(minutes)}:00`;
  } else if (parseInt(hours) < 59) {
    return `${incrementTimeUnits(hours)}:00:00`;
  } else {
    return '00:00:00';
  }
};

const incrementTimeUnits = (units)=>{
  units = parseInt(units); 
  units++;
  if (units < 10) {
    units = `0${units.toString()}`;
  } else {
    units = units.toString();
  }
  return units;
};

const convertStartEndToLengthOfTime = (start, end) => {
  let minutes = Math.floor((Date.parse(end) - Date.parse(start)) / 60000);
  let seconds = Math.floor((((Date.parse(end) - Date.parse(start)) / 60000) - minutes) * 60);
  if (seconds < 10) {
    return minutes.toString() + ':0' + seconds.toString();
  } else {
    return minutes.toString() + ':' + seconds.toString();
  }
};

module.exports.formatSessionsData = (sessionArray, id) => {
  let sessionInfo = [];
  console.log('session Array:', sessionArray);
  sessionArray.forEach((session) => {
    let lengthOfTime = convertStartEndToLengthOfTime(session.startedAt, session.endedAt);
    let name;
    if (session.profile1.id === id) {
      name = session.profile2.firstName + ' ' + session.profile2.lastName;
    } else {
      name = session.profile1.firstName + ' ' + session.profile1.lastName;
    }
    sessionInfo.push({
      name: name,
      promptName: session.prompt.name,
      lengthOfSession: lengthOfTime,
      category: session.prompt.category,
      difficulty: session.prompt.difficulty,
      rating: session.rating,
      solution: session.solutionCode,
      numberOfTests: session.numberOfTests,
      numberOfTestsPassed: session.numberOfTestsPassed
    });
  });
  return sessionInfo;
};

module.exports.updateRating = (totalUserSessions, userRating, newRating) => {
  return ((userRating * totalUserSessions) + newRating) / (totalUserSessions + 1);
};