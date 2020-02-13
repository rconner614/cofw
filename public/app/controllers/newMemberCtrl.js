(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('newMemberCtrl', newMemberCtrl);
    newMemberCtrl.$inject = ['emailSrv', '$scope'];
    function newMemberCtrl(emailSrv, $scope){
        $scope.form = {
            toEmail: 'Rachel Conner<cofwwebdeveloper@gmail.com>',
            text: null,
            html: null,
            subject: 'New Member Request',
            key: 'clean',
            member: null
        };

        $scope.member = {
            firstName: null,
            lastName: null,
            displayFirst: null,
            displayLast: null,
            email: null,
            displayEmail: true,
            pinterest: null,
            instagram: null,
            facebook: null,
            website: null,
            googlePlus: null,
            twitter: null,
            blurb: null,
            novels: null,
            novellas: null,
            catchMe: null
        };

        $scope.memberForm = function(){
            if($scope.member.catchMe){
                return;
            }
            $scope.submitting = true;
            $scope.form.member = $scope.member;
            var template = emailSrv.memberTemplate();
            template = template.replace('<name>', $scope.form.member.firstName + ' ' + $scope.form.member.lastName);
            template = template.replace('<displayName>', $scope.form.member.displayFirst + ' ' + $scope.form.member.displayLast);
            template = template.replace('<email>', $scope.form.member.email);
            template = template.replace('<displayEmail>', $scope.form.member.displayEmail ? 'Yes' : 'No');
            template = template.replace('<website>', $scope.form.member.website ? $scope.form.member.website : 'N/A');
            template = template.replace('<pinterest>', $scope.form.member.pinterest ? $scope.form.member.pinterest : 'N/A');
            template = template.replace('<facebook>', $scope.form.member.facebook ? $scope.form.member.facebook : 'N/A');
            template = template.replace('<twitter>', $scope.form.member.twitter ? $scope.form.member.twitter : 'N/A');
            template = template.replace('<instagram>', $scope.form.member.instagram ? $scope.form.member.instagram : 'N/A');
            template = template.replace('<googlePlus>', $scope.form.member.googlePlus ? $scope.form.member.googlePlus : 'N/A');
            template = template.replace('<blurb>', $scope.form.member.blurb);
            template = template.replace('<novels>', $scope.form.member.novels ? $scope.form.member.novels : '');
            template = template.replace('<novellas>', $scope.form.member.novellas ? $scope.form.member.novellas : '');
            $scope.form.text = template;
            $scope.form.html = $scope.form.text.replace('\n', '<br>');
            $scope.form.member = $scope.member;
            emailSrv.sendEmail($scope.form).then(function(resp){
                if(resp && resp.status === 200){
                    $scope.sent = true;
                } else {
                    console.log('error', resp);
                }
            }, function(resp){
                console.log(resp, 'error');
            }).finally(function(){
                $scope.submitting = false;
            });
        };
    }
}());