(function () {
    'use strict';
    angular.module('cofw.core')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope', 'data', '$sce', '$filter', 'postSrv'];
    function homeCtrl($scope, data, $sce, $filter, postSrv) {
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
            $scope.tag = ($scope.tags.filter(function(sItem){
                return sItem.title.toLowerCase() === x.toLowerCase();
            })[0]).id;
        };

        $scope.safeHTML = function (x) {
            return $sce.trustAsHtml(x);
        };

        $scope.filteredList = function(){
            var list = $filter('orderBy')($scope.posts, 'createdOn', true);
            return $filter('filter')(list, {postTags: $scope.tag});
        };

        $scope.page = function(){
            var begin = (($scope.currentPage - 1) * $scope.entryLimit),
                end = begin + $scope.entryLimit;

            return $scope.filteredList().slice(begin, end);
        };

        function setPage (pageNo) {
            $scope.currentPage = pageNo;
        }

        $scope.pageCount = function() {
            return Math.ceil($scope.filteredList().length / $scope.entryLimit);
        };

        $scope.forward = function(){
            if($scope.currentPage !== $scope.pageCount()){
                setPage($scope.currentPage + 1);
            }
        };

        $scope.back = function(){
            if($scope.currentPage !== 1){
                setPage($scope.currentPage - 1);
            }
        };





            //$scope.totalItems = $scope.friends.length;
            //$scope.$watch('currentPage + itemsPerPage', function() {
            //    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
            //        end = begin + $scope.itemsPerPage;
            //
            //    $scope.filteredFriends = $scope.friends.slice(begin, end);
            //});
    }
}());