// Service
var api = angular
    .module('tsc')
    .service('tscApi', tscApi)
    .filter('myFilter', function () {
        return function (items, search) {
            
            return items.topic === search;

            var result = [];
            angular.forEach(items, function (value, key) {

                console.log('value: ' + JSON.stringify(value) + ', key: ' + JSON.stringify(key) + ', search: ' + JSON.stringify(search));

                angular.forEach(value, function (value2, key2) {
                    console.log('value2: ' + JSON.stringify(value2) + ', key2: ' + JSON.stringify(key2));
    
                    if (value2 === search) {

                        console.log('push back: ' + JSON.stringify(value) + ' | ' + JSON.stringify(value2) );

                        result.push(value);
                    }
                });
            });
            return result;
        };
    });


// service implementation
tscApi.$inject = ['$http','$q', '$filter']; 
function tscApi ($http, $q, $filter) {

    console.log('tscApi instanciated.');

    var mainFile = [];
    var imgurl = 'https://causa.tagesspiegel.de';

    function getMainFile(){
        console.log("tscApi.getMainFile");

        return $q(function(resolve, reject){

            $http.get('data/all_debates.json')
                .then(function success(response){
                    
                   // console.log('mainfile ' + JSON.stringify(mainFile));

                    mainFile = response.data;
                    resolve(mainFile);

            }, function fail(response){
                reject(response);
            });
        });
    }

    this.getTopics = function _topics() {
        console.log("tscApi.getTopics");
        
        return $q(function(resolve, reject){

            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                    resolve(mainFile.topics);    
                });            
            } else {
                resolve(mainFile.topics);
            }
        });
    };

    this.getDebates = function _debates(topicId) {
        console.log("tscApi.getDebattes");

        return $q(function(resolve, reject){
 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                        resolve(mainFile.debates);
                        //resolve(JSLINQ(mainFile.debates).Where(function(item){ return item.topic == topicId; }));
                    });            
            } else {
                resolve($filter('myFilter')(mainFile.debates,{ "topic": topicId }));
            }
        });
    };

    this.getArticles = function _articles(debateId) {
        console.log("tscApi.getArticles");
        if (mainFile.length === 0){
            getMainFile().then(function success(response){
                return $q(function(resolve, reject){
                    resolve(mainFile.articles);
                });

            });            
        } else { 
            return $q(function(resolve, reject){
                resolve(mainFile.articles);
            });
        }
    };

    this.getThesis = function _thesis(articelId){
        console.log("tscApi.getArticle: " + id);
        return $http.get('data/' + articleId + '.json');  
    };

    this.getVotes = function _votes(){

    };

    this.getAuthors = function (){
        console.log("tscApi.getAuthors");
        if (mainFile.length === 0){
            getMainFile().then(function success(response){
                return $q(function(resolve, reject){
                    resolve(mainFile.authors);
                });

            });            
        } else { 
            return $q(function(resolve, reject){
                resolve(mainFile.articles);
            });
        }

    };
}



