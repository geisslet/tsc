angular.module('tsc')
    .controller('tscDebatesCtrl', tscDebatesCtrl);

tscDebatesCtrl.$inject = ['$log', 'tscApi', '$routeParams'];
function tscDebatesCtrl($log, tscApi, $routeParams){
	var vm = this;

	vm.debattes = {};
	vm.topicId = $routeParams.id;

	vm.class="";

	vm.activate = function _activate(){

		$log.debug("tscDebatesCtrl.activate " + JSON.stringify($routeParams));

		tscApi.getDebates(vm.topicId).then(function success(response){
			$log.debug("tscDebatesCtrl " + response);
			vm.debattes = response;
		}, function fail(response){
			$log.debug("tscDebatesCtrl.fail: " + response);	
		});
	};

	vm.flip = function(){
		if (vm.class=="flipped")
			vm.class="";
		else
			vm.class="flipped";
	};

}