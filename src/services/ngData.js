(function() {
    'use strict';

    /**
     * @ngdoc module
     * @name ngData.$ngData
     * @description `$ngData` object that will be used across an
     *              application
     *
     * @example <caption>registering a new model</caption>
     * angular
     *  .module('<moduleName>')
     *  .factory('Customer', function($ngData){
     *      //create $ngData model
     *      var Customer = $ngData.model('User',{
     *              tableName:'customers',
     *              timestamp:true,
     *              properties:{
     *                  name:{
     *                      type:String,
     *                      required:true
     *                  },
     *                  code:String,
     *                  email:{
     *                      type:String,
     *                      email:true,
     *                      required:true
     *                  },
     *                  joinedAt:{
     *                      type:Date,
     *                      defaultsTo: new Date()
     *                  }
     *              }
     *          });
     *
     *      //return created model
     *      return Customer;
     *  });
     *
     * @public
     */
    angular
        .module('ngData')
        .factory('$ngData', function($database, Collection, $q) {
            var $ngData = {};

            //models map registry
            $ngData.models = {};

            /**
             * @description register a new model into ngData and compile it
             * @param  {String} name       name of the model
             * @param  {Object} definition model definition
             * @return {Object}            valid ngData model
             */
            $ngData.model = function(name, definition) {
                //check if model alreay exist
                var model = _.get($ngData.models, name);
                if (model && !definition) {
                    return model;
                }

                //compile a model definition
                //and register it
                else {
                    //extend definition with model name
                    definition.name = name;

                    //instantiate a collection with definetion
                    $ngData.models[name] = new Collection(definition);

                    return _.get($ngData.models, name);
                }
            };

            /**
             * @description initialize ngData
             */
            $ngData.initialize = function() {
                //1. scan for models schema and register them
                _.forEach($database.models(), function(schema) {
                    $ngData.model(schema.name, schema);
                });

                //2. apply migration
                var migrations = _.map(_.values($ngData.models), function(collection) {
                    return $database
                        .alter(collection.tableName, collection.definition.properties);
                });

                return $q.all(migrations);

            };


            //export $ngData factory
            return $ngData;
        });
}());