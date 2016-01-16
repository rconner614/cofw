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

myApp.controller('appCtrl', appCtrl);
appCtrl.$inject = ['$scope', '$state'];
function appCtrl($scope, $state){
    $scope.today = new Date();
    $scope.mySlides = ['images/backgrounds/desk.jpg', 'images/wild_olivia.jpg'];
    $scope.state = $state;
}

myApp.config(config);
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: "/",
        templateUrl: "/app/views/_home.html",
        controller: 'homeCtrl',
        resolve:{
            posts: ['postSrv', function(postSrv){
                return postSrv.getAllPosts();
            }]
        //    info: ['infoSrv', function(infoSrv){
        //        return infoSrv.getInformation();
        //    }]
        }
    }).state('post', {
        url: "/post/:id",
        templateUrl: "/app/views/_post.html"
        //controller: 'postCtrl',
        //resolve:{
        //    post: ['postSrv', '$stateParams', function(postSrv, $stateParams){
        //        return postSrv.getPost($stateParams.id);
        //    }]
        //}
    }).state('about', {
        url: "/about",
        templateUrl: "/app/views/_about.html"
        //controller: 'aboutCtrl',
        //resolve: {
        //    info: ['infoSrv', function(infoSrv){
        //        return infoSrv.getInformation();
        //    }]
        //}
    }).state('contact', {
        url: "/contact",
        templateUrl: "/app/views/_contact.html"
        //controller: 'contactCtrl',
        //resolve: {
        //    contactInfo: ['infoSrv', function(info){
        //        return infoSrv.getContactInfo();
        //    }]
        //}
    }).state('contest', {
        url: "/contest",
        templateUrl: "/app/views/_contest.html"
        //controller: 'contestCtrl'
    }).state('meetings', {
        url: "/meetings",
        templateUrl: "/app/views/_meetings.html"
        //controller: 'contestCtrl'
    }).state('members', {
        url: "/members",
        templateUrl: "/app/views/_members.html"
        //controller: 'membersCtrl',
        //resolve: {
        //    members: ['memberSrv', function(memberSrv){
        //        return memberSrv.getMembers();
        //    }]
        //}
    }).state('member', {
        url: "/members/member/:id",
        templateUrl: "/app/views/_member.html"
        //controller: 'memberCtrl',
        //resolve: {
        //    member: ['memberSrv', '$stateParams', function(memberSrv, $stateParams){
        //        return memberSrv.getMember($stateParams.id);
        //    }]
        //}
    });
    $locationProvider.html5Mode(true);
}
