const models = require('../../db/models');

module.exports.getOne = (req, res) => {
  models.Test.where({ promptId: req.params.promptId }).fetchAll()
    .then(tests => {
      if (!tests) {
        throw tests;
      }
      res.status(200).send(tests);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Test.where({ promptId: req.params.promptId }).fetch()
    .then(test => {
      if (!test) {
        throw test;
      }
      return test.save(req.body, {method: 'update'});
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

// module.exports.update = (req, res) => {
//   models.Test.where({ promptId: req.params.promptId }).fetch()
//     .then(test => {
//       if (!test) {
//         throw test
//       }
//       return test.save(req.body, {method: 'update'})
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(500).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404)
//     });
// };

module.exports.create = (req, res) => {
  models.Test.forge(req.body)
    .save()
    .then(test => {
      res.status(201).send(test);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};