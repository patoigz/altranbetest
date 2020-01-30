const mongoose = require('mongoose');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();

const Client = require('../model/client');
const Policy = require('../model/policy');

describe('Content Unit Test', function() {
    before(function(done) {
        const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1/servertestdb';
        mongoose.connect(MONGO_URL, { useNewUrlParser: true }, done);
    });

    it('Schema client - find by name', function(done) {
        Client.findOne({ name: 'Merrill' }, function(err, doc) {
            expect(err).to.equal(null);
            expect(doc.name).to.not.equals('John');
            expect(doc.role).to.equal('user');
            expect(doc.id).to.equal('44e44268-dce8-4902-b662-1b34d2c10b8e');
            expect(doc.email).to.not.equals('pgarcia@aol.com');
            done();
        });
    });

    it('Schema policy - find by id', function(done) {
        Policy.findOne({ id: '4a582500-fab6-4efe-ae89-0c9ed750d0c7' }, function(err, doc) {
            expect(err).to.equal(null);
            expect(doc.amountInsured).to.equal(3074.24);
            expect(doc.installmentPayment).to.equal(false);
            expect(doc.clientId).to.not.equals('e8fd159b-57c4-4d36-9bd7-a59ca13057bb');
            done();
        });
    });

    it('Schema policy - find policies by client name', function(done) {
        let _name = 'Guthrie';
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
                expect(err).to.equal(null);
                expect(docs.length).to.equal(1);
                expect(docs[0].client.length).to.equal(1);
                expect(docs[0].client[0].name).to.equal(_name);
                expect(docs[0].client[0].email).to.equal('guthrieblankenship@quotezart.com');
                done();
            }
        );
    });

    it('Schema policy - find client by policy id', function(done) {
        let _id = '6305aa29-c423-4abf-82e0-0fdfb958b9c6';
        Policy.findOne({ id: _id })
            .populate('client')
            .then(doc => {
                expect(doc).to.not.equal(null);
                expect(doc.client.name).to.equal('Manning');
                expect(doc.client.id).to.equal('e8fd159b-57c4-4d36-9bd7-a59ca13057bb');
                done();
            });
    });

    after(function(done) {
        mongoose.connection.close(done);
    });
});
