const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Friend 
    .where({ profileId: req.query.profileId })
    .fetchAll({
      withRelated: ['friend']
    })
    .then(friends => {
      res.status(200).send(friends);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.create = (req, res) => {
  models.Friend
    .forge(req.body)
    .save()
    .then(() => {
      models.Friend
        .forge({
          profileId: req.body.friendId,
          friendId: req.body.profileId,
          status: req.body.status,
          updatedBy: req.body.updatedBy
        })
        .save();
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.update = (req, res) => {
  models.Friend
    .where({
      profileId: req.body.profileId,
      friendId: req.body.friendId
    })
    .fetch()
    .then(friendship => {
      if (!friendship) {
        throw friendship;
      }
      friendship.save({
        status: req.body.status,
        updatedBy: req.body.updatedBy
      }, { method: 'update' });
    })
    .then(() => {
      models.Friend
        .where({
          profileId: req.body.friendId,
          friendId: req.body.profileId
        })
        .fetch()
        .then(friendship => {
          if (!friendship) {
            throw friendship;
          }
          friendship.save({
            status: req.body.status,
            updatedBy: req.body.updatedBy
          }, { method: 'update' });
        });
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
