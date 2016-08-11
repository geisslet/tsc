angular.module('tsc')
    .controller('tscMatrixViewCtrl', tscMatrixViewCtrl);

tscMatrixViewCtrl.$inject = ['$log', 'tscApi', '$routeParams','$sce'];
function tscMatrixViewCtrl($log, tscApi, $routeParams,$sce){
	var vm = this;

	vm.debates = {};
	vm.articles = {};
	vm.article = {};
	vm.topicId = $routeParams.id;
	vm.bDebateSelected=false;
	vm.bShowArticleMatrix=true;
	vm.bShowArticle=false;
	vm.bShowAuthor=false;
	vm.selectedDebate={};
	vm.bubbleData = [];//[[10, 10], [20, 20], [16, 0], [30, 12], [38, -30]];


	vm.activate = function _activate(){

		$log.debug("tscMatrixViewCtrl.activate " + JSON.stringify($routeParams));

		tscApi.getDebates().then(function success(response){
			$log.debug("tscMatrixViewCtrl " + response);
			vm.debates = response;

		}, function fail(response){
			$log.debug("tscMatrixViewCtrl.fail: " + response);	
		});
	};
	
	vm.setDebateSelected = function _setDebateSelected(){
			vm.bDebateSelected=true;
	};

	vm.showArticlesMatrix = function _articleMatrix(debateId){
		$log.debug("tscMatrixViewCtrl.showArticlesMatrix");

		vm.bDebateSelected=true;
		vm.selectedDebate = vm.debates[debateId];

		tscApi.getArticlesOfDebate(debateId).then(function success(response){
			$log.debug("tscMatrixViewCtrl.showArticlesMatrix.getArticlesOfDebate " + response);
			vm.articles = response;
		});
		tscApi.getVotesDataOfDebate(debateId).then(function success(response){
			$log.debug("tscMatrixViewCtrl.showArticlesMatrix.getVotesDataOfDebate " + JSON.stringify(response));
			vm.bubbleData = response;
		});
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