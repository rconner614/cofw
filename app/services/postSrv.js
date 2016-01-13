(function(){
    'use strict';
    angular.module('cofw.core')
        .factory('postSrv', postSrv);
    function postSrv(){
        var posts = [
            {
                id: 1,
                date: new Date(0, 9, 2016),
                headline: 'This is the first post',
                subHeadline: 'This is a sub headline',
                content: 'This is the first post'
            }
        ];
        function getPost(x){
            return posts.filter(function(sItem){
                return sItem.id === x;
            })[0];
        }

        return{
            getAllPosts: function(){
                return posts;
            },
            getPost: getPost
        }
    }
}());