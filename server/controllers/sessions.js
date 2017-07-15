const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Session.fetchAll()
    .then(sessions => {
      res.status(200).send(sessions);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.create = (req, res) => {
  models.Session.forge(req.body)
    .save()
    .then(session => {
      res.status(201).send(session);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.getOne = (req, res) => {
  models.Session.where({ id: req.params.id }).fetch()
    .then(session => {
      if (!session) {
        throw session;
      }
      res.status(200).send(session);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
