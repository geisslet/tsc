angular.module('tsc')
    .controller('debattesCtrl', debattesCtrl);

debattesCtrl.$inject = ['tscApi'];
function debattesCtrl(tscApi){
	var vm = this;

	vm.debattes = {};

	vm.activate = function _activate(){
		vm.debattes = tscApi.getDebattes();
	};

}