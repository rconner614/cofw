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
        templateUrl: "/app/views/_contact.html",
        controller: ['$scope', 'leadership', function($scope, leadership){
            $scope.leadership = leadership.leadership;
        }],
        resolve: {
            leadership: ['memberSrv', function(memberSrv){
                return memberSrv.getMembers();
            }]
        }
    }).state('contest', {
        url: "/contest",
        templateUrl: "/app/views/_contest.html",
        controller: 'contestCtrl'
    }).state('newMember', {
        url: "/member-form",
        templateUrl: "/app/views/_addMember.html",
        controller: 'newMemberCtrl'
    }).state('membership', {
        url: "/membership",
        templateUrl: "/app/views/_membership.html",
        controller: ['$scope', 'leadership', function($scope, leadership){
            $scope.leadership = leadership.leadership;
        }],
        resolve: {
            leadership: ['memberSrv', function(memberSrv){
                return memberSrv.getMembers();
            }]
        }
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
    })
    .state('classes', {
        url: "/classes",
        templateUrl: "/app/views/_classes.html"
    })
    .state('classesSuccessAugust', {
        url: "/classes/success/august",
        templateUrl: "/app/views/_classes_success_august.html"
    }).state('classAugust', {
        url: "/classes/august",
        templateUrl: "/app/views/_register.html",
        controller: 'classCtrl',
        resolve: {
            className: [function() {
                return 'August 2020 Class'
            }]
        }
    }).state('paypalAugust', {
        url: "/payment/august",
        templateUrl: "/app/views/_paypal.html",
        controller: ['$scope', 'id', function($scope, id) {
            $scope.id = id;
        }],
        resolve: {
            id: [function() {
                return '3WY4P27925T7Q'
            }]
        }
    }).state('classesSuccessSeptember', {
        url: "/classes/success/september",
        templateUrl: "/app/views/_classes_success_september.html"
    }).state('classSeptember', {
        url: "/classes/september",
        templateUrl: "/app/views/_register.html",
        controller: 'classCtrl',
        resolve: {
            className: [function() {
                return 'September 2020 Class'
            }]
        }
    }).state('paypalSeptember', {
        url: "/payment/september",
        templateUrl: "/app/views/_paypal.html",
        controller: ['$scope', 'id', function($scope, id) {
            $scope.id = id;
        }],
        resolve: {
            id: [function() {
                return 'TSGJQRMEC3AJY'
            }]
        }
    }).state('meetingSuccessSeptember', {
        url: "/meetings/success/september",
        templateUrl: "/app/views/_meeting_success.html"
    }).state('meetingSuccessOctober', {
        url: "/meetings/success/october",
        templateUrl: "/app/views/_meeting_success.html"
    }).state('classesSuccessOctober', {
        url: "/classes/success/october",
        templateUrl: "/app/views/_classes_success_october.html"
    }).state('classOctober', {
        url: "/classes/october",
        templateUrl: "/app/views/_register.html",
        controller: 'classCtrl',
        resolve: {
            className: [function() {
                return 'October 2020 Class'
            }]
        }
    }).state('paypalOctober', {
        url: "/payment/october",
        templateUrl: "/app/views/_paypal.html",
        controller: ['$scope', 'id', function($scope, id) {
            $scope.id = id;
        }],
        resolve: {
            id: [function() {
                return '7NTBA3PJE79BQ'
            }]
        }
    }).state('classesSuccessjanuary', {
        url: "/classes/success/january",
        templateUrl: "/app/views/_classes_success_jan.html"
    }).state('classjanuary', {
        url: "/classes/january",
        templateUrl: "/app/views/_register.html",
        controller: 'classCtrl',
        resolve: {
            className: [function() {
                return 'January 2021 Class'
            }]
        }
    }).state('paypaljanuary', {
        url: "/payment/january",
        templateUrl: "/app/views/_paypal.html",
        controller: ['$scope', 'id', function($scope, id) {
            $scope.id = id;
        }],
        resolve: {
            id: [function() {
                return '86JEUN9TPGWR6'
            }]
        }
    });
    // .state('successContest', {
    //     url: "/contest/success",
    //     templateUrl: "/app/views/_success-contest.html"
    // })
    // .state('workshop', {
    //     url: "/workshop",
    //     templateUrl: "/app/views/_workshop.html",
    //     controller: 'workshopCtrl'
    // }).state('successWorkshop', {
    //     url: "/workshop/success",
    //     templateUrl: "/app/views/_success-workshop.html"
    // });
    $locationProvider.html5Mode(true);
}