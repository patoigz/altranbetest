const Client = require('../model/client');
const Policy = require('../model/policy');

const service = {
    /*
     * retorna todas las pólizas
     */
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
    },
    /*
     * retorna el cliente vinculado al número de póliza indicada
     */
    findClientByPolicyId: (req, res) => {
        let _id = req.params._id;
        Policy.findOne({ id: _id })
            .populate('client')
            .then(doc => {
                return res.json({ client: doc.client });
            })
            .catch(err => {
                return res.status(500).send(err);
            });
    },
    // Otra forma de consultar lo mismo
    // findClientByPolicyId: (req, res) => {
    //     let _id = req.params._id;
    //     Policy.aggregate(
    //         [
    //             { $match: { id: { $eq: _id } } },
    //             {
    //                 $lookup: {
    //                     from: Client.collection.name,
    //                     localField: 'clientId',
    //                     foreignField: 'id',
    //                     as: 'client'
    //                 }
    //             }
    //         ],
    //         (err, docs) => {
    //             if (err) return res.status(500).send(err);
    //             let client = {};
    //             // Se puede consultar de la siguiente forma...
    //             // Porque sólo existe un usuario que pertenece a una póliza
    //             if (docs.length > 0 && docs[0].client.length > 0) {
    //                 client = docs[0].client[0];
    //             }
    //             return res.json(client);
    //         }
    //     );
    // },
    /*
     * retorna todas las pólizas de un cliente en particular por su ID
     */
    findByClientId: (req, res) => {
        let _id = req.params._id;
        Policy.find({ clientId: _id })
            .sort({ amountInsured: -1 })
            .then(docs => {
                return res.json({ policies: docs });
            })
            .catch(err => {
                return res.status(500).send(err);
            });
    },
    /*
     * retorna todas las pólizas de un cliente en particular por su nombre
     * case insensitive
     */
    findByClientName: (req, res) => {
        let _name = req.params._name;
        Policy.aggregate(
            [
                {
                    $lookup: {
                        from: Client.collection.name,
                        localField: 'clientId',
                        foreignField: 'id',
                        as: 'client'
                    }
                },
                { $match: { 'client.name': { $regex: _name, $options: '-i' } } }
            ],
            (err, docs) => {
                if (err) return res.status(500).send(err);
                return res.json(docs);
            }
        );
    }
};

module.exports = service;
