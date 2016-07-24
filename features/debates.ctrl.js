angular.module('tsc')
    .controller('tscDebatesCtrl', tscDebatesCtrl);

tscDebatesCtrl.$inject = ['$log', 'tscApi'];
function tscDebatesCtrl($log, tscApi){
	var vm = this;

	vm.debattes = {};

	vm.activate = function _activate(){

		$log.debug("tscDebatesCtrl.activate");

		tscApi.getDebattes().then(function success(response){
			$log.debug("tscDebatesCtrl " + response);
			vm.debattes = response;
		}, function fail(response){
			$log.debug("tscDebatesCtrl.fail: " + response);	
		});
		
	};

}