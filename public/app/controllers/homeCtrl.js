(function () {
    'use strict';
    angular.module('cofw.core')
        .controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope', 'data', '$sce', '$filter'];
    function homeCtrl($scope, data, $sce, $filter) {
        $scope.posts = data.posts;
        $scope.currentPage = 1;
        $scope.entryLimit = 5;

        $scope.$on('resetHome', function(){
            $scope.currentPage = 1;
        });

        $scope.posts = $scope.posts.filter(function(sItem){
            return !sItem.releaseOn || new Date(sItem.releaseOn) <= new Date();
        });

        $scope.posts.forEach(function(post){
            post.createdOnDate = moment(post.createdOn).format("dddd, MMMM Do YYYY");
            if(post.content && post.content.indexOf("<span id='readmore-marker'></span>") > -1){
                post.content = (String(post.content).split("<span id='readmore-marker'></span>"))[0] + "<a href='/post/" + post.id + "' class='readmore'>Continue Reading...</a>";
            }
        });

        $scope.totalPosts = $scope.posts.length;

        $scope.safeHTML = function (x) {
            return $sce.trustAsHtml(x);
        };

        $scope.filteredList = function(){
          return $filter('orderBy')($scope.posts, 'createdOn', true);
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
            backToTop();
            if($scope.currentPage !== $scope.pageCount()){
                setPage($scope.currentPage + 1);
            }
        };

        $scope.back = function(){
            backToTop();
            if($scope.currentPage !== 1){
                setPage($scope.currentPage - 1);
            }
        };

        function backToTop(){
            jQuery('html, body').animate({scrollTop: '0px'}, 800);
        }
    }
}());