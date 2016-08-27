/* 
    quappe root 

    intention: holds the main navigation and instanciates the angular app

*/ 

var tscapp = angular 
    .module('tsc', ['ngAnimate','ngSanitize','ngRoute'])
    //.module('tsc', ['ngRoute'])
    .controller('tscAppCtrl', tscAppCtrl)
    .config(route)
    .directive('compile', ['$compile', function ($compile) {
        return function(scope, element, attrs) {
            scope.$watch(
                function(scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.compile);
                },
                function(value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    console.log("compile: " + value);
                    element.html(value);

                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );
        };
    }])
    .directive('compileTxt', function($compile, $parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
              var parsed = $parse(attr.ngBindHtml);
              
              //Recompile if the template changes
              scope.$watch(
                function() { 
                  return (parsed(scope) || '').toString(); 
                }, 
                function() {
                    $compile(element, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
                }
              );
            }
        };
    });

tscAppCtrl.$inject = ['tscApi'];
function tscAppCtrl(tscApi){

    var vm = this;

    vm.topics = [];

    vm.activate = function _activate(){

        console.log('tscAppCtrl activate - the Main - should be always the first');

        tscApi.getTopics().then(function success(response){
            vm.topics = response;
        });

    };
}

function route($routeProvider){

    console.log('tsc.app.viewhandling called');

    $routeProvider
        /*.when('/debates',{
            templateUrl: 'features/debates.html',
            name: 'debate'
        })*/
        .when('/debates/:id',{
            templateUrl: 'features/debates.html',
            name: 'debate'
        })
        .when('/articles',{
            templateUrl: 'features/articles.html',
            name: 'articles'
        })
        .when('/articles/:id',{
            templateUrl: 'features/articles.html',
            name: 'articles'
        })
        /*.when('/article/:id',{
            templateUrl: 'features/article.html',
            name: 'article'
        })*/
        .when('/authors',{
            templateUrl: 'features/authors.html',
            name: 'authors'
        })
        .when('/matrix-view',{
            templateUrl: 'features/matrix-view.html',
            name: 'matrix-view'
        })
        .otherwise({
            //redirectTo: '/articles',
            redirectTo: 'matrix-view'
        });
}

