angular.module('tsc')
    .controller('tscMatrixViewCtrl', tscMatrixViewCtrl);

tscMatrixViewCtrl.$inject = ['$log', 'tscApi', '$routeParams','$sce'];
function tscMatrixViewCtrl($log, tscApi, $routeParams,$sce){
	var vm = this;

	vm.debattes = {};
	vm.articles = {};
	vm.article = {};
	vm.topicId = $routeParams.id;
	vm.bShowDetails=false;


	vm.activate = function _activate(){

		$log.debug("tscMatrixViewCtrl.activate " + JSON.stringify($routeParams));

		tscApi.getDebates().then(function success(response){
			$log.debug("tscMatrixViewCtrl " + response);
			vm.debattes = response;

		}, function fail(response){
			$log.debug("tscMatrixViewCtrl.fail: " + response);	
		});
	};


	vm.showArticlesMatrix = function _articleMatrix(debateId){
		$log.debug("tscMatrixViewCtrl.articlesMatrix");

		tscApi.getArticlesOfDebatte(debateId).then(function success(response){
			$log.debug("tscMatrixViewCtrl.articlesMatrix " + response);
			vm.articles = response;

			vm.bShowDetails=false;
		});
	};

	vm.showArticle = function _showArticle(){
			vm.bShowDetails=true;
	};

	vm.gotoAnchor = function(x) {
      var newHash = 'anchor' + x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('anchor' + x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };
}