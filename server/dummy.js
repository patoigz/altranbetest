const Client = require('./model/client');
const Policy = require('./model/policy');
const dataObjClients = require('./data/clients.json');
const dataObjPolicies = require('./data/policies.json');

module.exports = {
    setup: database => {
        try {
            Client.insertMany(dataObjClients.clients, function(err, docs) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('client documents inserted to collection');
                }
            });
        } catch (ex) {
            console.error(ex);
        }
        try {
            Policy.insertMany(dataObjPolicies.policies, function(err, docs) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('policy documents inserted to collection');
                }
            });
        } catch (ex) {
            console.error(ex);
        }
    }
};
