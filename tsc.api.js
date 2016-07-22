// Service

var api = angular
    .module('tsc')
    .service('tscApi', tscApi);

tscApi.$inject = ['$http','$q']; 
function tscApi ($http, $q) {

    console.log('tscApi instanciated.');
   
  
    this.status = function () {

        //return { status: 'mock, just a mock. mock style.'};

        return $q(function(resolve, reject){
            esclient.cluster.state({
            metric: [
              'cluster_name',
              'nodes',
              'master_node',
              'version'
            ]
          })
          .then(function (resp) {
            console.log(JSON.stringify(resp));

            this.clusterState = resp;
            this.error = null;

            resolve(resp);
            //return resp;
          })
          .catch(function (err) {
            this.clusterState = null;
            this.error = err;

            reject(err);
            
        });
      });
    };

    this.get = function () {
        $http.get('data/all_debates.json')
            .success(function(response) {
                return response.data;
        });
    };
}