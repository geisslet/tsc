angular.module('tsc')
    .controller('tscArticlesCtrl', tscArticlesCtrl);

tscArticlesCtrl.$inject = ['$log', 'tscApi', '$routeParams','$sce'];
function tscArticlesCtrl($log, tscApi, $routeParams, $sce){
 
//	$log.debug("tscArticlesCtrl called");

	var vm = this;
	vm.debateId = $routeParams.id;
	vm.debate = {};
	vm.articles = [];

	vm.activate = function _activate(){

		$log.debug("tscArticlesCtrl.activate " + JSON.stringify($routeParams));


		tscApi.getDebate(vm.debateId).then(function success(response){
			$log.debug("getDebate " + response);
			vm.debate = response;
		}, function fail(response){
			$log.debug("tscArticlesCtrl.fail: " + response);	
		});

		tscApi.getArticlesOfDebatte(vm.debateId).then(function success(response){
			$log.debug("tscArticlesCtrl " + response);
			vm.articles = response;
		}, function fail(response){
			$log.debug("tscArticlesCtrl.fail: " + response);	
		});
	};
}