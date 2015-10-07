'use strict';

describe('Query#equals', function() {

    var User;
    beforeEach(module('ngData'));

    beforeEach(inject(function($ngData) {
        User = $ngData.model('Customer', {
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

    it('should be able to build a simple where equal to condition', inject(function(Query) {
        var query = new Query({
            collection: User
        }).find().where().equals('age', 20);

        expect(query.toString()).to.equal('SELECT * FROM customers WHERE (age = 20)');
    }));


    it('should be able to build equals condition given condition object', inject(function(Query) {
        var query = new Query({
            collection: User
        }).find().where().equals({
            age: 20,
            height: 40
        });
        expect(query.toString()).to.equal('SELECT * FROM customers WHERE (age = 20 AND height = 40)');
    }));

});
