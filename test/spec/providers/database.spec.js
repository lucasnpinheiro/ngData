'use strict';

describe('$databaseProvider', function() {
    //reference
    var databaseProvider;

    // load the ngData module
    beforeEach(function() {
        module('ngData', function($databaseProvider) {
            databaseProvider = $databaseProvider;
        });
    });

    afterEach(function() {
        databaseProvider.store = databaseProvider.Stores.MEMORY;
    });

    it('should be injectable', inject(function() {
        expect(databaseProvider).to.exist;
    }));

    it('should be able to provide database types', inject(function() {
        expect(databaseProvider.Stores).to.exist;
    }));

    it('should be able to provide default database configurations', inject(function() {
        expect(databaseProvider.name).to.exist;
        expect(databaseProvider.description).to.exist;
        expect(databaseProvider.version).to.exist;
        expect(databaseProvider.size).to.exist;
        expect(databaseProvider.store).to.exist;
        expect(databaseProvider.store)
            .to.be.equal(databaseProvider.Stores.MEMORY);
    }));

    it('should be able to configure database', inject(function() {
        //seeds
        var name = faker.internet.userName();
        var description = faker.lorem.sentence();
        var version = Math.ceil(Math.random() * 10) + '.0.0';
        var size = Math.ceil(Math.random() * 1024 * 1024);

        //configure database
        databaseProvider.name = name;
        databaseProvider.description = description;
        databaseProvider.version = version;
        databaseProvider.size = size;
        databaseProvider.store = databaseProvider.Stores.WEB_SQL;

        expect(databaseProvider.name).to.be.equal(name);
        expect(databaseProvider.description).to.be.equal(description);
        expect(databaseProvider.version).to.be.equal(version);
        expect(databaseProvider.size).to.be.equal(size);
        expect(databaseProvider.store)
            .to.be.equal(databaseProvider.Stores.WEB_SQL);
    }));

    describe('model', function() {

        it('should be able to expose model register', inject(function() {
            expect(databaseProvider.model).to.exist;
            expect(databaseProvider.model).to.be.a('function');
        }));

        it('should be able to register a model definition', inject(function() {
            var model = databaseProvider.model('User');
            expect(model).to.not.exist;
            expect(model).to.be.an.undefined;

            var Types = databaseProvider.Types;
            var properties = {
                name: Types.STRING
            };

            model = databaseProvider.model('User', {
                properties: properties
            });

            expect(model).to.exist;
            expect(model.name).to.exist;
            expect(model.properties).to.eql(properties);

        }));

    });

});