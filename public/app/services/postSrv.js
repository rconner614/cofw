(function(){
    'use strict';
    angular.module('cofw.core')
        .factory('postSrv', postSrv);
    postSrv.$inject = ['$q','$http'];
    function postSrv($http){
        var getAllPosts = function(){
            $http.get('../data/posts.json').then(function(resp){
                console.log('success', resp);
            }, function(resp){
                console.log('failed', resp);
            });
        };

        var getPost = function(x){
            var posts = getAllPosts();
            if(posts){
                return posts.filter(function(sItem){
                    return sItem.id === x;
                })[0];
            } else{
                return null;
            }
        };

        var getTags = function(){
            return $http.get('../data/posts.json').success(function(resp) {
                return resp.data.tags;
            });
        };

        return{
            getAllPosts: function(){
                console.log('got to service');
                return getAllPosts();
            },
            getPost: getPost,
            getTags: getTags
        }
    }
}());