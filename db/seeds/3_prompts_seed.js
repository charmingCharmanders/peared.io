const models = require('../models');
let prompts = require('../data/prompts');

if (process.env.NODE_ENV === 'test') {
  prompts = require('../data/test/prompts');
}

exports.seed = function (knex, Promise) {
  prompts.forEach(iteratedPrompt => {
    return models.Prompt
      .where({
        name: iteratedPrompt.name
      })

      .fetch()

      .then(prompt => {
        if (prompt) {
          throw prompt;
        }
        return models.Prompt
          .forge({
            name: iteratedPrompt.name,
            description: iteratedPrompt.description,
            category: iteratedPrompt.category,
            hint: iteratedPrompt.hint,
            skeletonCode: iteratedPrompt.skeletonCode,
            solutionCode: iteratedPrompt.solutionCode,
            rating: iteratedPrompt.rating
          })
          .save();
      })

      .error(() => {
        console.error('ERROR: failed to create prompt');
      })

      .catch(prompt => {
        console.error(`WARNING: ${prompt.get('name')} already exists`);
      });
  });
};
