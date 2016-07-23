// Service

var api = angular
    .module('tsc')
    .service('tscApi', tscApi);

tscApi.$inject = ['$http','$q']; 
function tscApi ($http, $q) {

    console.log('tscApi instanciated.');
   
    this.getTopics = function _topics(argument) {
        // body...
    };

    this.getDebattes = function () {
        console.log("tscApi.getDebattes");
        return $http.get('data/all_debates.json');
    };



    this.getArticles = function () {
        console.log("tscApi.getArticles");
        return $http.get('data/all_debates.json');
    };

}