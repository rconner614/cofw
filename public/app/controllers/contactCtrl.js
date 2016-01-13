(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('contactCtrl', contactCtrl);
    contactCtrl.$inject = ['$scope', 'contactInfo'];
    function contactCtrl($scope, contactInfo){
        $scope.info = contactInfo;
    }
}());