// Service

var api = angular
    .module('tsc')
    .service('tscApi', tscApi);

tscApi.$inject = ['$http','$q']; 
function tscApi ($http, $q) {

    console.log('tscApi instanciated.');

    var mainFile = [];

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
                resolve(mainFile.debates);
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