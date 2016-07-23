angular.module('tsc')
    .controller('tscArticlesCtrl', tscArticlesCtrl);

tscArticlesCtrl.$inject = ['$log', 'tscApi'];
function tscArticlesCtrl($log, tscApi){
 
//	$log.debug("tscArticlesCtrl called");

	var vm = this;

	vm.activate = function _activate(){
		console.log('tscArticlesCtrl');
	};
}