angular.module('tsc')
    .controller('tscDebattesCtrl', tscDebattesCtrl);

tscDebattesCtrl.$inject = ['$log', 'tscApi'];
function tscDebattesCtrl($log, tscApi){
	var vm = this;

	vm.debattes = {};

	vm.activate = function _activate(){

		$log.debug("tscDebattesCtrl.activate");

		
		tscApi.getDebattes().then(function success(response){
			vm.debattes = response.data;
		}, function fail(response){
			$log.debug("tscDebattesCtrl.fail: " + response);	
		});
		
	};

}