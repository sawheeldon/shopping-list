var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

// chai.should is a CHAI METHOD
var should = chai.should();

// grabbing objects from server.js
// via exports.app and etc.
var app = server.app;
var storage = server.storage;

// chai is prompted to use http extension
chai.use(chaiHttp);

// writes test for the GET function
describe('Shopping List', function () {
    it('should list items on GET', function (done) {
        chai.request(app)
            .get('/items')
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                // res.body is items array [{}, {}, {}]
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    it('should add an item on post', function (done) {
        chai.request(app)
            .post('/items')
            .send({
                'name': 'Kale'
            })
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                // res.body is the item that was added {name: "", id: #}
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                res.body.id.should.equal(3);
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');
                storage.items[3].id.should.equal(3);
                done();
            });
    });

    it('should edit an item on put', function (done) {
        chai.request(app)
            .put('/items/0')
            .send({
                'name': 'cereal'
            })
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                // res.body is the edited item {name: "", id: #}
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('cereal');
                res.body.id.should.equal(0);
                storage.items[0].should.be.a('object');
                storage.items[0].should.have.property('name');
                storage.items[0].should.have.property('id');
                storage.items[0].name.should.equal('cereal');
                storage.items[0].id.should.equal(0);
                storage.items[0].name.should.be.a('string');
                storage.items[0].id.should.be.a('number');
                done();
            });
    });


    it('should delete an item on delete', function (done) {
        chai.request(app)
            .delete('items/1')
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                // res.body is the deleted object {name: '', id: #}
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.id.should.equal(1);
                res.body.name.should.equal('Tomatoes');
                storage.items.length.should.equal(3);
                storage.items[0].name.should.equal('Broad beans');
                storage.items[1].name.should.equal('Tomatoes');
                storage.items[2].name.should.equal('Peppers');
                done();
            });
    });
});
