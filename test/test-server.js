var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
   it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
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
    it('should add an item on post');
    it('should edit an item on put');
    it('should delete an item on delete');
    it('POST to an ID that exists');
    it('POST without body data');
    it('POST with something other than valid JSON');
    it('PUT without an ID in the endpoint');
    it('PUT with different ID in the endpoint than the body');
    it('PUT to an ID that doesnt exist');
    it('PUT without body data');
    it('PUT with something other than valid JSON');
    it('DELETE an ID that doesnt exist');
    it('DELETE without an ID in the endpoint');
    it('should allow edit on double click');
});