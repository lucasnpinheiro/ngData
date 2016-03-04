'use strict';

describe('$database', function() {
    var databaseProvider;

    // load the ngData module
    beforeEach(function() {
        module('ngData', function($databaseProvider) {
            databaseProvider = $databaseProvider;
        });
    });


    it('should be injectable', inject(function($database) {
        expect($database).to.exist;
        expect($database.query).to.exist;
        expect($database.connect).to.exist;
    }));

    it('should be able to establish connection', function(done) {

        inject(function($rootScope, $timeout, $database) {

            $database.connect().then(function(_connection) {
                expect(_connection).to.exist;
                expect($database.connection).to.exist;
                expect($database.connection).to.not.be.null;
                done(null, _connection);
            }).catch(function(error) {
                done(error);
            });

            // wait for propagation
            $timeout(function() {
                $rootScope.$apply();
            }, 50);

        });

    });

    describe.only('model', function() {

        it('should be able to compile models', function(done) {

            inject(function($rootScope, $timeout, $database) {
                var Types = databaseProvider.Types;
                var properties = {
                    name: Types.STRING
                };

                //register model
                databaseProvider.model('User', {
                    properties: properties
                });

                $database.connect().then(function(_connection) {

                    expect(_connection).to.exist;
                    expect($database.connection).to.exist;
                    expect($database.connection).to.not.be.null;

                    var User = $database.model('User');
                    expect(User.collectionName).to.equal('User');
                    expect(User.tableName).to.equal('users');

                    done(null, _connection);
                }).catch(function(error) {
                    done(error);
                });

                // wait for propagation
                $timeout(function() {
                    $rootScope.$apply();
                }, 50);

            });

        });

    });

});