(function(){
   'use strict';
    angular.module('cofw.core')
        .factory('memberSrv', memberSrv);
    memberSrv.$inject = ['$http', '$q'];
    function memberSrv($http, $q){
        function getMembers(){
            var df = $q.defer();
            $http.get('../app/data/members.json').then(function(resp){
                //console.log('success', resp.data);
                df.resolve(resp.data);
            }, function(resp){
                console.log('failed', resp);
                df.reject(resp);
            });
            return df.promise;
        }

        return {
            getMembers: getMembers
        }
    }
}());