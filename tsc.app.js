/* 
    quappe root 

    intention: holds the main navigation and instanciates the angular app

*/ 

var tscapp = angular 
    .module('tsc', ['ngRoute'])
    .config(route);

function route($routeProvider){

    console.log('tsc.app.viewhandling called');

    $routeProvider
        .when('/debattes',{
            templateUrl: 'features/debattes.html',
            name: 'browse'
        })
        .when('/articles',{
            templateUrl: 'features/articles.html'
        })
        .when('/article',{
            templateUrl: 'features/article.html',
        })
        .otherwise({
            redirectTo: 'features/debattes.html'
        });
}