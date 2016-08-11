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

		$log.debug("tscArticlesCtrl.activate - para:" + JSON.stringify($routeParams));

		if (vm.debateId === undefined){

			$log.debug("tscArticlesCtrl.activate - no para - getRandomArticle");

            tscApi.getRandomArticle().then(function success(response){
                
                vm.articles.push(response);

				$log.debug("tscArticlesCtrl.activate - random article: " + JSON.stringify(response));

				/*
				// debate info
				tscApi.getDebate(response.debate).then(function success(response){
					$log.debug("getDebate " + response);
					vm.debate = response;
				}, function fail(response){
					$log.debug("tscArticlesCtrl.fail: " + response);	
				});*/

			});


		} else {

			// debate info
			tscApi.getDebate(vm.debateId).then(function success(response){
				$log.debug("getDebate " + response);
				vm.debate = response;
			}, function fail(response){
				$log.debug("tscArticlesCtrl.fail: " + response);	
			});

			// get articles
			tscApi.getArticlesOfDebate(vm.debateId).then(function success(response){
				$log.debug("tscArticlesCtrl " + response);
				vm.articles = response;
			}, function fail(response){
				$log.debug("tscArticlesCtrl.fail: " + response);	
			});
		}

	};
}