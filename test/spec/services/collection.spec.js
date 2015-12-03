'use strict';

describe('Collection', function() {
    this.timeout = function() {
        return 10000;
    };

    var User;

    beforeEach(module('ngData'));

    beforeEach(function(done) {

        inject(function($ngData, $rootScope) {
            User = $ngData.model('Customer', {
                properties: {
                    name: {
                        type: String,
                        defaultsTo: faker.name.findName()
                    },
                    code: {
                        type: String
                    }
                }
            });

            $ngData.initialize().then(function(response) {
                done(null, response);
            }).catch(function(error) {
                done(error);
            });

            //wait for propagation
            setTimeout(function() {
                $rootScope.$apply();
            }, 50);

        });
    });

    //TODO clean up
    beforeEach(function(done) {

        inject(function($rootScope) {
            User.remove().then(function(response) {
                done(null, response);
            }).catch(function(error) {
                done(error);
            });

            //wait for propagation
            setTimeout(function() {
                $rootScope.$apply();
            }, 100);

        });

    });

    describe('Collection#new', function() {

        it('should be able to instantiate new model instance', inject(function() {

            expect(User.new).to.exist;
            var user = User.new();

            expect(user).to.exist;
            expect(user).to.have.ownProperty('name');
            expect(user).to.have.ownProperty('code');

        }));

        it('should be able to instantiate new model instance with data', inject(function() {

            var _user = {
                name: faker.name.findName(),
                code: faker.random.uuid()
            };

            var user = User.new(_user);

            expect(user.name).to.be.equal(_user.name);
            expect(user.code).to.be.equal(_user.code);

        }));

    });

    describe('Collection#create', function() {
        it('should be able to create documents', inject(function() {
            expect(User.create).to.be.a('function');
        }));

        it('should be able to create a new record and save it into the database', function(done) {

            inject(function($rootScope) {
                var user = {
                    name: faker.name.firstName(),
                    code: Math.ceil(Math.random() * 999)
                };

                User.create(user).then(function(response) {
                    console.log(response);
                    done(null, response);
                }).catch(function(error) {
                    done(error);
                });

                //wait for propagation
                setTimeout(function() {
                    $rootScope.$apply();
                }, 50);
            });

        });
    });

    describe('Collection#remove', function() {
        it('should be able to remove documents', inject(function() {
            expect(User.remove).to.be.a('function');
        }));
    });

    describe('Collection#update', function() {
        it('should be able to update documents', inject(function() {
            expect(User.update).to.be.a('function');
        }));
    });

    it('should be able to update the record in the database without returning them');

    it('should be able to remove the selected record from collection');

});