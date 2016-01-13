(function(){
   'use strict';
    angular.module('cofw.core')
        .factory('memberSrv', memberSrv);
    function memberSrv(){
        var members = [
            {
                name: 'Jane Conner',
                email: 'djconner@earthlink.net',
                id: 1
            },
            {
                name: 'Marcia James',
                email: 'acmarcia@aol.com',
                id: 2
            }
        ];

        function getMember(x){
            return members.filter(function(sItem){
                return sItem.id === x.id;
            })[0];
        }

        return {
            getMembers: function(){
                return members;
            },
            getMember: getMember
        }
    }
}());