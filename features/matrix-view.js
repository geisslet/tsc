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
	vm.indicatorColor={ 'background-color': 'black' };
	vm.lastThesisID = '';
	vm.lastThesisText = '';

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
		
		var dist = angular.element($event.target).prop('offsetTop') + angular.element($event.target).prop('offsetHeight');
		vm.indicatorStyle = { top: dist +'px', left: angular.element($event.target).prop('offsetLeft')+'px'};
		$log.debug("vm.indicatorStyle: " + JSON.stringify(vm.indicatorStyle));
		
		vm.indicatorStyleHighlight = {width: angular.element($event.target).prop('offsetWidth') + 'px'};
		$log.debug("vm.indicatorStyleHighlight: " + JSON.stringify(vm.indicatorStyleHighlight));
		//angular.element( document.querySelector('#indicator-debates').attr("left",offsetTop);
	};
	vm.paintArticleIndicator = function _paintArticleIndicator($event){

		console.log($event);
		vm.lastThesisID = angular.element($event.target).prop('id');
		vm.lastThesisText = angular.element($event.target).prop('innerText');

		/*$log.debug("offsetTop: "+angular.element($event.target).prop('offsetTop'));
		$log.debug("offsetWidth: "+angular.element($event.target).prop('offsetWidth'));
		$log.debug("offsetHeight: "+angular.element($event.target).prop('offsetHeight'));
		$log.debug("offsetLeft: "+angular.element($event.target).prop('offsetLeft'));
		$log.debug("event.target: "+angular.element($event.target));*/

		
		var dist = angular.element($event.target).prop('offsetTop') + angular.element($event.target).prop('offsetHeight');
		var width = window.innerWidth - angular.element($event.target).prop('offsetLeft');
		
		var color = (1==1)?'rgb(0,138,130)':'rgb(225,0,26)';

		vm.articleIndicatorStyle = { top: dist +'px', left: angular.element($event.target).prop('offsetLeft')+'px', width: width + 'px'};
		
		$log.debug("vm.articleIndicatorStyle: " + JSON.stringify(vm.articleIndicatorStyle));
		
		vm.articleIndicatorStyleHighlight = {width: angular.element($event.target).prop('offsetWidth') + 'px', 'background-color': color};
		vm.indicatorColor = { 'background-color':color};
		$log.debug("vm.articleIndicatorStyleHighlight: " + JSON.stringify(vm.articleIndicatorStyleHighlight));
	

	};

	vm.switch2Visual = function(){

	};

	vm.showAlert = function _alertTest($event){
		$log.debug("showAlert " + JSON.stringify($event));
		alert("showAlert "+ JSON.stringify($event));
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