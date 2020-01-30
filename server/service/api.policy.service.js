const Policy = require('../model/policy');

const service = {
    all: (req, res) => {
        Policy.find({})
            .sort({ amountInsured: -1 })
            .populate('client')
            .then(docs => {
                return res.json({ policies: docs });
            })
            .catch(err => {
                return res.status(500).send(err);
            });
    }
};

module.exports = service;
