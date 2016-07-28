/* 
    quappe root 

    intention: holds the main navigation and instanciates the angular app

*/ 

var tscapp = angular 
    .module('tsc', ['ngRoute'])
    .controller('tscAppCtrl', tscAppCtrl)
    .config(route);

tscAppCtrl.$inject = ['tscApi'];
function tscAppCtrl(tscApi){

    var vm = this;

    vm.topics = [];

    vm.activate = function _activate(){
        tscApi.getTopics().then(function success(response){
            vm.topics = response;
        });
    };

}

function route($routeProvider){

    console.log('tsc.app.viewhandling called');

    $routeProvider
        .when('/debates',{
            templateUrl: 'features/debates.html',
            name: 'debate'
        })
        .when('/debates/:id',{
            templateUrl: 'features/debates.html',
            name: 'debate'
        })
        .when('/articles',{
            templateUrl: 'features/articles.html',
            name: 'articles'
        })
        .when('/article/:id',{
            templateUrl: 'features/article.html',
            name: 'article'
        })
        .when('/authors',{
            templateUrl: 'features/authors.html',
            name: 'authors'
        })
        .otherwise({
            redirectTo: 'features/debates.html',
            name: 'debate'
        });
}