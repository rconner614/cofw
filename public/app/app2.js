var myApp = angular.module("myApp", [
    'ui.router',
    'ui.bootstrap',
    'cofw.core'
]);

myApp.run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess',function(){
        $("html, body").animate({ scrollTop: 0 }, 300);
    })
});

myApp.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

myApp.controller('appCtrl', appCtrl);
appCtrl.$inject = ['$scope', '$state', '$http', '$sce'];
function appCtrl($scope, $state, $http, $sce){
    $scope.today = new Date();
    $scope.state = $state;
    $scope.posts = $http.get('/app/data/posts.json').then(function(resp){
        $scope.posts = resp.data.posts;
    });

    $scope.safeHTML = function(x){
        return $sce.trustAsHtml(x);
    };
    for(var i = 0; i < $scope.posts.length; i++){
        $scope.posts[i].createdOn = new Date($scope.posts[i].date);
    }

}

myApp.config(config);
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: "/",
        templateUrl: "/app/views/_home.html",
        controller: 'homeCtrl',
        resolve: {
            data: ['postSrv', function(postSrv){
                return postSrv.getAllPosts();
            }]
        }
    }).state('post', {
        url: "/post/:id",
        templateUrl: "/app/views/_postPage.html",
        controller: 'postCtrl',
        resolve: {
            data: ['postSrv', function(postSrv){
                return postSrv.getAllPosts();
            }]
        }
    }).state('about', {
        url: "/about",
        templateUrl: "/app/views/_about.html",
        controller: 'aboutCtrl'
    }).state('contact', {
        url: "/contact",
        templateUrl: "/app/views/_contact.html",
        controller: 'contactCtrl'
    }).state('contest', {
        url: "/contest",
        templateUrl: "/app/views/_contest.html",
        controller: 'contestCtrl'
    }).state('meetings', {
        url: "/meetings",
        templateUrl: "/app/views/_meetings.html",
        controller: 'meetingsCtrl',
        resolve: {
            data: ['postSrv', function(postSrv){
                return postSrv.getAllPosts();
            }]
        }
    }).state('members', {
        url: "/members",
        templateUrl: "/app/views/_members.html",
        controller: 'membersCtrl',
        resolve: {
            data: ['memberSrv', function(memberSrv){
                return memberSrv.getMembers();
            }]
        }
    }).state('member', {
        url: "/members/member/:id",
        templateUrl: "/app/views/_memberSingle.html",
        controller: 'memberCtrl',
        resolve: {
            data: ['memberSrv', function(memberSrv){
                return memberSrv.getMembers();
            }]
        }
    });
    $locationProvider.html5Mode(true);
}
