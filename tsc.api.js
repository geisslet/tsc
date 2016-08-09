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


    // we assume that this is called first all time!
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

            var debates = filterListToArray(mainFile.debates, "topic", topicId);
            debates["topic_title"] = mainFile.topics[topicId].title;
            resolve(debates);
        });
    };
    this.getDebate = function _debate(debateId) {
        console.log("tscApi.getDebate for " + debateId);

        return $q(function(resolve, reject){
 
                var debate = mainFile.debates[debateId];
                debate["topic_title"] = mainFile.topics[debate.topic];
                resolve(debate);
        });
    };

    this.getArticlesOfDebatte = function _articlesOfDebatte(debateId) {
        console.log("tscApi.getArticles");

        return $q(function(resolve, reject){ 
            resolve(filterListToArray(mainFile.articles, "debate", debateId));    
        });
    };
   /* this.getArticlesOfAuthor = function _articlesOfAuthor(authorId) {
        console.log("tscApi.getArticles");

        return $q(function(resolve, reject){ 
 
            var articles = filterListToArray(mainFile.articles, "author", authorId);

            resolve(articles);
 
        });
    };*/
    /*this.getArticle = function _article(articleId) {
        console.log("tscApi.getArticle for " + articleId);

        return $q(function(resolve, reject){ 
 
            var article = mainFile.articles[articleId]

            resolve(article);
        });
    };*/


    this.getAuthors = function _authors(){

        console.log("tscApi.getAuthors");

        return $q(function(resolve, reject){ 
            if (mainFile.length === 0){
                getMainFile().then(function success(response){

                        var authors = mainFile.authors;

                        for(var a in authors){

                            // update pic
                            authors[a].images.portrait = 'https://causa.tagesspiegel.de'+authors[a].images.portrait;

                            // org
                            if (authors[a].organisation !== undefined){
                                console.log("org id: " + authors[a].organisation);
                                authors[a].organisation = mainFile.organisations[authors[a].organisation].name;
                            }

                            authors[a]["theses"] = filterListToArray(mainFile.theses, "created_by", a);
                            authors[a]["articles"] = filterListToArray(mainFile.articles, "author", a);
                            authors[a]["votes"] = filterListToArray(mainFile.votes, "author", a);

                            for (var i = 0; i < authors[a].votes.length; i++) {
                                authors[a].votes[i]["thesis_text"] = mainFile.theses[authors[a].votes[i].thesis].text;   
                            }

                        }

                        resolve(authors);
                    });            
            } else {
                resolve(mainFile.authors);
            }
        });
    };

    this.getAuthor = function _author(authorId){
        return $q(function(resolve, reject){
            getAuthors().then(function success(response){
              resolve(response.authorId);
          });
        });
    };

    this.getAuthorsProVote = function _proVoteAuthors(thesisId){

    };

    this.getAuthorsConVote = function _conVoteAuthors(thesisId){

    };
}



