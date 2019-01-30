(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('classCtrl', classCtrl);
    classCtrl.$inject = ['emailSrv', '$scope', 'className', '$location'];
    function classCtrl(emailSrv, $scope, className, $location){
        $scope.form = {
            toEmail: 'COFW Treasurer<cofwtreasurer@gmail.com>, COFW Developer<cofwwebdeveloper@gmail.com>, COFW President<cofwpresident@gmail.com>',
            text: null,
            html: null,
            subject: 'Class Registration Submitted',
            key: 'clean',
            user: {
                firstName: null,
                lastName: null,
                email: null,
                isCOFWMember: false,
                isRWAMember: false,
                className: className
            }
        };
        $scope.redirect = window.location.pathname.replace('classes', 'payment');

        $scope.sendEmail = function(){
            $scope.sending = true;
            var template = emailSrv.classTemplate();
            template = template.replace('<name>', $scope.form.user.firstName + ' ' + $scope.form.user.lastName);
            template = template.replace('<email>', $scope.form.user.email);
            template = template.replace('<isCOFWMember>', $scope.form.user.isCOFWMember ? 'Yes' : 'No');
            template = template.replace('<isRWAMember>', $scope.form.user.isRWAMember ? 'Yes' : 'No');
            template = template.replace('<Class>', $scope.form.user.className);
            $scope.form.text = template;
            $scope.form.html = $scope.form.text.replace('\n', '<br>');
            emailSrv.sendEmail($scope.form).then(function(resp){
                console.log(resp);
                if(resp && resp.status === 200){
                    $location.path($scope.redirect);
                } else {
                    $scope.error = true;
                    console.log('error', resp);
                }
            }, function(resp){
                console.log(resp, 'error');
                $scope.error = true;
            }).finally(function(){
                $scope.sending = false;
            });
        }
    }
}());