'use strict';

describe('Query', function() {

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

    it('should be injectable', inject(function(Query) {
        var query = new Query({
            collection: User
        });

        expect(query).to.exist;

        expect(query).to.be.instanceof(Query);

    }));

});
