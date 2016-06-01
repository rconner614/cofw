(function () {
    'use strict';
    angular.module('cofw.core')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope', 'data', '$sce', 'filterFilter', 'postSrv'];
    function homeCtrl($scope, data, $sce, filterFilter, postSrv) {
        $scope.posts = data.posts;
        $scope.tags = data.tags;
        $scope.currentPage = 1;
        $scope.entryLimit = 5;
        $scope.tag = '';

        for (var i = 0; i < $scope.posts.length; i++) {
            $scope.posts[i].createdOnDate = moment($scope.posts[i].createdOn).format("dddd, MMMM Do YYYY");
        }
        $scope.totalPosts = $scope.posts.length;

        $scope.typeFilter = function(x){
            console.log(x);
            $scope.tag = ($scope.tags.filter(function(sItem){
                return sItem.title.toLowerCase() === x.toLowerCase();
            })[0]).id;
            console.log($scope.tag);
        };

        $scope.tab = 1;
        $scope.category = 1;

        $scope.safeHTML = function (x) {
            return $sce.trustAsHtml(x);
        };

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.maxItems = 5;
    }
}());