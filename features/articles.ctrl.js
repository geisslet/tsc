angular.module('tsc')
    .controller('tscArticlesCtrl', tscArticlesCtrl);

tscArticlesCtrl.init('tscApi');
function tscArticlesCtrl(tscApi){
 
	var vm = this;

	vm.activate = function _activate(){
		console.log('tscArticlesCtrl');
	};
}