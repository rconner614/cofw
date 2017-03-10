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
appCtrl.$inject = ['$scope', '$state', '$http', '$sce', '$rootScope'];
function appCtrl($scope, $state, $http, $sce, $rootScope){
    $scope.today = new Date();
    $scope.state = $state;
    $scope.posts = $http.get('/app/data/posts.json').then(function(resp){
        $scope.posts = resp.data.posts;
    });

    $scope.resetHome = function(){
        $rootScope.$broadcast('resetHome');
    };

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
        templateUrl: "/app/views/_post.html",
        controller: 'postCtrl',
        resolve: {
            data: ['postSrv', function(postSrv){
                return postSrv.getAllPosts();
            }]
        }
    }).state('about', {
        url: "/about",
        templateUrl: "/app/views/_about.html"
    }).state('newsletters', {
        url: "/newsletters",
        templateUrl: "/app/views/_newsletter.html"
    }).state('contact', {
        url: "/contact",
        templateUrl: "/app/views/_contact.html"
        //controller: 'contactCtrl'
    }).state('contest', {
        url: "/contest",
        templateUrl: "/app/views/_contest.html",
        controller: 'contestCtrl'
    }).state('retreat', {
        url: "/retreat",
        templateUrl: "/app/views/_retreat.html"
    }).state('workshop', {
        url: "/workshop",
        templateUrl: "/app/views/_workshop.html"
    }).state('successContest', {
        url: "/contest/success",
        templateUrl: "/app/views/_success-contest.html"
    }).state('successRetreat', {
        url: "/retreat/success",
        templateUrl: "/app/views/_success-retreat.html"
    }).state('successWorkshop', {
        url: "/workshop/success",
        templateUrl: "/app/views/_success-workshop.html"
    }).state('membership', {
        url: "/membership",
        templateUrl: "/app/views/_membership.html"
    }).state('march-event', {
        url: "/march-2017-event",
        templateUrl: "/app/views/_marchEvent.html"
    }).state('meetings', {
        url: "/meetings",
        templateUrl: "/app/views/_meetings.html",
        controller: 'meetingsCtrl',
        resolve: {
            data: ['postSrv', function(postSrv){
                return postSrv.getMeetings();
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
        templateUrl: "/app/views/_member.html",
        controller: 'memberCtrl',
        resolve: {
            data: ['memberSrv', function(memberSrv){
                return memberSrv.getMembers();
            }]
        }
    });
    $locationProvider.html5Mode(true);
}
