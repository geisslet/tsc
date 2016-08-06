angular.module('tsc')
    .controller('tscArticleCtrl', tscArticleCtrl);

tscArticleCtrl.$inject = ['$log', 'tscApi','$routeParams'];
function tscArticleCtrl($log, tscApi, $routeParams){
 
//	$log.debug("tscArticlesCtrl called");

	var vm = this;
	vm.articleId=$routeParams.id;
	vm.article = {};

	vm.activate = function _activate(){
		$log.debug("tscArticleCtrl.activate " + JSON.stringify($routeParams));

		tscApi.getArticle(vm.articleId).then(function success(response){
			$log.debug("tscArticleCtrl " + response);
			vm.article = response;
		}, function fail(response){
			$log.debug("tscArticleCtrl.fail: " + response);	
		});
	};
}