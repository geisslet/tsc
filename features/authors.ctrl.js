angular.module('tsc')
    .controller('tscAuthorsCtrl', tscAuthorsCtrl);

tscAuthorsCtrl.$inject = ['$log', 'tscApi', '$routeParams'];
function tscAuthorsCtrl($log, tscApi, $routeParams){
	var vm = this;

	vm.authors = {};
	vm.topicId = $routeParams.id;

	vm.activate = function _activate(){

		$log.debug("tscAuthorsCtrl.activate " + JSON.stringify($routeParams));

		tscApi.getAuthors().then(function success(response){
			$log.debug("tscAuthorsCtrl " + response);
			vm.authors = response;
		}, function fail(response){
			$log.debug("tscAuthorsCtrl.fail: " + response);	
		});
		
	};

}