(function () {
    'use strict';
    angular.module('cofw.core')
        .controller('meetingsCtrl', meetingsCtrl);
    meetingsCtrl.$inject = ['$scope', 'data', '$sce'];
    function meetingsCtrl($scope, data, $sce) {
        var meetings = data.meetings;
        meetings.map(function(meeting){
            meeting.dateOrig = angular.copy(meeting.date);
            meeting.date = meeting.date ? new Date(meeting.date) : null;
            return meeting;
        });
        $scope.chunks = [];
        $scope.chunks[0] = [meetings[0], meetings[1], meetings[2]];
        $scope.chunks[1] = [meetings[3], meetings[4], meetings[5]];
        $scope.chunks[2] = [meetings[6], meetings[7], meetings[8]];
        $scope.chunks[3] = [meetings[9], meetings[10], meetings[11]];
        $scope.safeHTML = function (x) {
            return $sce.trustAsHtml(x);
        };

        
    }
}());