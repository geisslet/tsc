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
	vm.indicatorStyle={top: -1+'px'};
	vm.indicatorStyleHighlight={};

	vm.articleIndicatorStyle={top: -1+'px'};
	vm.articleIndicatorStyleHighlight={};

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

		// get the article
		tscApi.getArticlesOfDebate(debateId).then(function success(response){
			$log.debug("tscMatrixViewCtrl.showArticlesMatrix.getArticlesOfDebate " + response);
			vm.articles = response;
		});

		// get data for the bubble chart
		tscApi.getVotesDataOfDebate(debateId).then(function success(response){
			$log.debug("tscMatrixViewCtrl.showArticlesMatrix.getVotesDataOfDebate " + JSON.stringify(response));
			vm.bubbleData = response;
		});
	};

	vm.ShowArticle = function _articeDetail(keyA, $event){
		$log.debug("ShowArticle: " + keyA + " / " + JSON.stringify($event));
	};


	vm.paintIndicator = function _paintIndicator($event){
		/*$log.debug("offsetTop: "+angular.element($event.target).prop('offsetTop'));
		$log.debug("offsetWidth: "+angular.element($event.target).prop('offsetWidth'));
		$log.debug("offsetHeight: "+angular.element($event.target).prop('offsetHeight'));
		$log.debug("length: "+angular.element($event.target).prop('length'));
		$log.debug("event.offsetX: "+angular.element($event.target).prop('event.offsetX'));
		$log.debug("event.offsetY: "+angular.element($event.target).prop('event.offsetY'));
		$log.debug("event.target: "+angular.element($event.target));*/
		var dist = angular.element($event.target).prop('offsetTop') + angular.element($event.target).prop('offsetHeight');
		vm.indicatorStyle = { top: dist +'px'};//'{"background-color":"yellow"}';
		$log.debug("vm.indicatorStyle: " + vm.indicatorStyle);
		vm.indicatorStyleHighlight = {width: angular.element($event.target).prop('offsetWidth') + 'px'};
		$log.debug("vm.indicatorStyleHighlight: " + vm.indicatorStyleHighlight);
		//angular.element( document.querySelector('#indicator-debates').attr("left",offsetTop);
	};
	vm.paintArticleIndicator = function _paintArticleIndicator($event){
		$log.debug("offsetTop: "+angular.element($event.target).prop('offsetTop'));
		$log.debug("offsetWidth: "+angular.element($event.target).prop('offsetWidth'));
		$log.debug("offsetHeight: "+angular.element($event.target).prop('offsetHeight'));
		$log.debug("length: "+angular.element($event.target).prop('length'));
		$log.debug("event.offsetX: "+angular.element($event.target).prop('event.offsetX'));
		$log.debug("event.offsetY: "+angular.element($event.target).prop('event.offsetY'));
		$log.debug("event.target: "+angular.element($event.target));
		var dist = angular.element($event.target).prop('offsetTop') + angular.element($event.target).prop('offsetHeight');
		vm.articleIndicatorStyle = { top: dist +'px'};//'{"background-color":"yellow"}';
		$log.debug("vm.articleIndicatorStyle: " + vm.articleIndicatorStyle);
		vm.articleIndicatorStyleHighlight = {width: angular.element($event.target).prop('offsetWidth') + 'px'};
		$log.debug("vm.articleIndicatorStyleHighlight: " + vm.articleIndicatorStyleHighlight);
	
	};

	vm.showAlert = function _alertTest(){
		$log.debug("alert");
		alert("alert");
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