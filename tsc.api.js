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
    function filterListToArray(objlist, key, value){
        var array = [];
        for(var item in objlist){

            // skip loop if the property is from prototype
            if(!objlist.hasOwnProperty(item)) continue;

            //console.log('filterListToArray for ' + key + ':' + value + '@' + JSON.stringify(item));

            if (objlist[item][key] === value){

                var o = objlist[item];
                o["id"] = item;
                array.push(o);
            }
        }
        return array;
    }

    this.getRandomArticle = function _randomArticle(){
        return $q(function(resolve, reject){


            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                        resolve(mainFile.articles[Math.floor(Math.random() * Object.keys(mainFile.articles).length)]);
                    });            
            } else {
                resolve(mainFile.articles[Math.floor(Math.random() * Object.keys(mainFile.articles).length)]);
            }

            //var random = jsonContent.featured[Math.floor(Math.random() * jsonContent.featured.length)];
            //console.log(random)
            //resolve(random);
        });
    };

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
        console.log("tscApi.getDebattes for " + topicId);

        return $q(function(resolve, reject){
 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                        resolve(filterListToArray(mainFile.debates, "topic", topicId));
                    });            
            } else {
                resolve(filterListToArray(mainFile.debates, "topic", topicId));
            }
        });
    };
    this.getDebate = function _debate(debateId) {
        console.log("tscApi.getDebate for " + debateId);

        return $q(function(resolve, reject){
 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                        resolve(mainFile.debates[debateId]);
                    });            
            } else {
                resolve(mainFile.debates[debateId]);
            }
        });
    };

    this.getArticlesOfDebatte = function _articlesOfDebatte(debateId) {
        console.log("tscApi.getArticles");

        return $q(function(resolve, reject){ 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                        resolve(filterListToArray(mainFile.articles, "debate", debateId));
                    });            
            } else {
                resolve(filterListToArray(mainFile.articles, "debate", debateId));
            }
        });
    };
    this.getArticlesOfAuthor = function _articlesOfAuthor(authorId) {
        console.log("tscApi.getArticles");

        return $q(function(resolve, reject){ 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                        resolve(filterListToArray(mainFile.articles, "author", authorId));
                    //TODO   articles_theses
                    });            
            } else {
                resolve(filterListToArray(mainFile.articles, "author", authorId));
            }
        });
    };
    this.getArticle = function _article(articleId) {
        console.log("tscApi.getArticle for " + articleId);

        return $q(function(resolve, reject){ 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){
                        resolve(mainFile.articles[articleId]);
                    //TODO   articles_theses
                    });            
            } else {
                resolve(mainFile.articles[articleId]);
            }
        });
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

    this.getAuthorDetails = function _authorDetails(authorId){
        var details = {};

        // get articles
        details["articles"] = filterListToArray(mainfile.articles, "author", authorId);

        // get votes (including thesis content)
        details["votes"] = filterListToArray(mainfile.votes, "author", authorId);

        for (var i = 0; i<details.votes.length; i++) {
            details.votes[i]["thesis_content"] = filterListToArray(mainfile.theses, "thesis", details.votes[i].thesis);
        }

        // get author theses
        details["theses"] = filterListToArray(mainfile.theses, "author", authorId);
        

    };
}



