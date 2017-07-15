const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Prompt.fetchAll()
    .then(prompts => {
      res.status(200).send(prompts);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.create = (req, res) => {
  models.Prompt.forge(req.body)
    .save()
    .then(prompt => {
      res.status(201).send(prompt);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.getOne = (req, res) => {
  models.Prompt.where({ id: req.params.id }).fetch()
    .then(prompt => {
      if (!prompt) {
        throw prompt;
      }
      res.status(200).send(prompt);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Prompt.where({ id: req.params.id }).fetch()
    .then(prompt => {
      if (!prompt) {
        throw prompt;
      }
      return prompt.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deleteOne = (req, res) => {
  models.Prompt.where({ id: req.params.id }).fetch()
    .then(prompt => {
      if (!prompt) {
        throw prompt;
      }
      return prompt.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
