(function(){
    'use strict';
    angular.module('cofw.core')
        .factory('postSrv', postSrv);
    postSrv.$inject = ['$q','$http'];
    function postSrv($http){
        function getAllPosts(){
            var df = $q.defer();
            $http.get('/data/posts.json').then(function(resp){
                console.log('pulled data', resp);
                df.resolve(resp.data.posts);
            }, function(resp){
                console.log('failed to pull posts', resp);
                df.reject(resp);
            });
            return df.promise;
        }

        function getPost(x){
            var posts = null;
            getAllPosts().then(function(resp){
                posts = resp.data.posts;
            }, function(resp){
                console.log('failed to pull posts', resp);
            });
            if(posts){
                return posts.filter(function(sItem){
                    return sItem.id === x;
                })[0];
            } else{
                return null;
            }
        }

        return{
            getAllPosts: getAllPosts,
            getPost: getPost
        }
    }
}());