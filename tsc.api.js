// Service
var api = angular
    .module('tsc')
    .service('tscApi', tscApi);

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

                    mainFile =  response.data;
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


    function filterListToArray(objlist, key, value){
        var array = [];
        for(var item in objlist){

            // skip loop if the property is from prototype
            if(!objlist.hasOwnProperty(item)) continue;

            console.log(JSON.stringify(item));

            if (objlist[item][key] === value){

                var o = objlist[item];
                o["id"] = item;
                array.push(o);
            }
        }
        return array;
    }
    this.getDebates = function _debates(topicId) {
        console.log("tscApi.getDebattes for " + topicId);

        return $q(function(resolve, reject){
 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){

                        //resolve(mainFile.debates);
                        resolve(filterListToArray(mainFile.debates, "topic", topicId));
                        //resolve(JSLINQ(mainFile.debates).Where(function(item){ return item.topic == topicId; }));
                    });            
            } else {
                // resolve($filter('myFilter')(mainFile.debates,{ "topic": topicId }));
                //resolve(mainFile.debates);
                resolve(filterListToArray(mainFile.debates, "topic", topicId));
            }
        });
    };

    this.getArticles = function _articles(debateId) {
        console.log("tscApi.getArticles");

        return $q(function(resolve, reject){ 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                        resolve(mainFile.articles);
                    });            
            } else {
                resolve(mainFile.articles);
            }
        });
    };

    this.getThesis = function _thesis(articelId){
        console.log("tscApi.getArticle: " + id);
        return $http.get('data/' + articleId + '.json');  
    };

    this.getVotes = function _votes(){
        console.log("tscApi.getVotes");

        return $q(function(resolve, reject){ 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                        resolve(mainFile.votes);
                    });            
            } else {
                resolve(mainFile.votes);
            }
        });
    };

    this.getAuthors = function _authors(){

        console.log("tscApi.getAuthors");

        return $q(function(resolve, reject){ 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                        resolve(mainFile.authors);
                    });            
            } else {
                resolve(mainFile.authors);
            }
        });
    };
}



