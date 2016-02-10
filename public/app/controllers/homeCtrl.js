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

        for (var i = 0; i < $scope.posts.length; i++) {
            $scope.posts[i].createdOnDate = moment($scope.posts[i].date).format("dddd, MMMM Do YYYY");
        }
        $scope.update = function () {
            $scope.filtered = filterFilter($scope.posts, {type: $scope.word});
            $scope.totalPosts = $scope.filtered.length;
        };

        $scope.resetFilters = function () {
            $scope.word = null;
        };

        $scope.update();

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