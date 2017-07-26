module.exports.calculateSessionScore = (timeLimitInSeconds, promptTime, promptDifficulty, tests, testsPassed) => {
  let diffObj = {1: 10, 2: 50, 3: 250, 4: 1000};
  let percentageOfTimeLimit = (timeLimitInSeconds - (promptTime))/timeLimitInSeconds;
  let score = ((percentageOfTimeLimit * .40) + .60) * diffObj[promptDifficulty] * (testsPassed/tests);
  if (promptDifficulty === 1) {
    return score;
  } else {
    return score - (score % 5);
  }
}

const convertStartEndToLengthOfTime = (start, end) => {
  let minutes = Math.floor((Date.parse(end) - Date.parse(start))/60000)
  let seconds = Math.floor((((Date.parse(end) - Date.parse(start))/60000) - minutes) * 60);
  if (seconds < 10) {
    return minutes.toString() + ':0' + seconds.toString();
  } else {
    return minutes.toString() + ':' + seconds.toString();
  }
}

module.exports.formatSessionsData = (sessionArray, id) => {
  let sessionInfo = [];
  sessionArray.forEach((session) => {
    let lengthOfTime = convertStartEndToLengthOfTime(session.startedAt, session.endedAt);
    if (session.profile1.id === id) {
      let name = session.profile2.firstName + " " + session.profile2.lastName
      sessionInfo.push({
        name: name,
        promptName: session.prompt.name,
        lengthOfSession: lengthOfTime,
        lengthOfSessionInSeconds: Date.parse(session.endedAt) - Date.parse(session.startedAt),
        category: session.prompt.category,
        difficulty: session.prompt.difficulty
      });
    } else {
      let name = session.profile1.firstName + " " + session.profile1.lastName
      sessionInfo.push({
        name: name,
        promptName: session.prompt.name,
        lengthOfSession: lengthOfTime,
        category: session.prompt.category,
        difficulty: session.prompt.difficulty
      });
    }
  })
  return sessionInfo;
}

module.exports.updateRating = (totalUserSessions, userRating, newRating) => {
  return ((userRating * totalUserSessions) + newRating)/(totalUserSessions + 1);
}