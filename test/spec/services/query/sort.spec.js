'use strict';

describe('Query#sort', function() {

    var Customer;

    beforeEach(module('ngData'));

    beforeEach(inject(function($ngData) {
        Customer = $ngData.model('Customer', {
            properties: {
                name: {
                    type: String,
                    defaultsTo: faker.name.findName()
                },
                code: {
                    type: String
                },
                age: {
                    type: Number,
                    defaultsTo: 20
                }
            }
        });
    }));

    it('should be able to build a simple ascending order by query condition', inject(function(Query) {

        var query = new Query({
            collection: Customer
        }).find().sort('name');

        expect(query.toString()).to.be.equal('SELECT * FROM customers ORDER BY name ASC');
    }));

    it('should be able to build an ascending order query for multiple arguments', inject(function(Query) {

        var query = new Query({
            collection: Customer
        }).find().sort('name', 'age', 'height');

        expect(query.toString()).to.be.equal('SELECT * FROM customers ORDER BY name ASC, age ASC, height ASC');
    }));

    it('should be able to build a order by query depending on the object provided', inject(function(Query) {

        var query = new Query({
            collection: Customer
        }).select().sort({
            name: 'desc',
            age: 'asc',
            code: 1,
            height: -1
        });

        expect(query.toString()).to.be.equal('SELECT * FROM customers ORDER BY name DESC, age ASC, code ASC, height DESC');
    }));
});