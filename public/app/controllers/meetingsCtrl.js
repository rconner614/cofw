(function () {
    'use strict';
    angular.module('cofw.core')
        .controller('meetingsCtrl', meetingsCtrl);
    meetingsCtrl.$inject = ['$scope', '$http', '$sce', 'filterFilter'];
    function meetingsCtrl($scope, $http, $sce, filterFilter) {
        $http.get('/app/data/posts.json').then(function (resp) {
            $scope.posts = resp.data.posts;
            console.log($scope.posts);
            $scope.tags = resp.data.tags;
        }, function(resp){
            console.log(resp);
        });
        $scope.currentPage = 1;
        $scope.entryLimit = 5;

        $scope.tagName = 'a';

        for (var i = 0; i < $scope.posts.length; i++) {
            $scope.posts[i].createdOnDate = moment($scope.posts[i].date).format("dddd, MMMM Do YYYY");
        }

        $scope.update = function () {
            $scope.filtered = filterFilter($scope.posts, {type: $scope.word});
            console.log($scope.filtered);
            $scope.totalPosts = $scope.filtered.length;
        };
        $scope.resetFilters = function () {
            $scope.word = null;
        };
        $scope.updateSearch = function () {
            $scope.filtered = filterFilter($scope.posts, {type: String($scope.word)});
        };
        $scope.update();

        $scope.tab = 1;
        $scope.category = 1;
        $scope.tagName = '';

        $scope.safeHTML = function (x) {
            return $sce.trustAsHtml(x);
        };

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.maxItems = 5;
    }
}());