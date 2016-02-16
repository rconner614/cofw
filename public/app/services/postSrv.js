(function(){
    'use strict';
    angular.module('cofw.core')
        .factory('postSrv', postSrv);
    postSrv.$inject = ['$http', '$q'];
    function postSrv($http, $q){
        function getAllPosts(){
            var df = $q.defer();
            $http.get('../app/data/posts.json').then(function(resp){
                console.log('success', resp.data);
                df.resolve(resp.data);
            }, function(resp){
                console.log('failed', resp);
                df.reject(resp);
            });
            return df.promise;
        }

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

        function getTags(){
            var df = $q.defer();
            $http.get('../app/data/posts.json').then(function(resp) {
                console.log(resp, 'tags');
                df.resolve(resp.data.tags);
            }, function(resp){
                console.log('failed to get tags', resp);
                df.reject(resp);
            });
            return df.promise;
        }


        return{
            getAllPosts: getAllPosts,
            getPost: getPost,
            getTags: getTags
        }
    }
}());