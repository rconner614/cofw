(function(){
    'use strict';
    angular.module('cofw.core')
        .controller('workshopCtrl', workshopCtrl);
    workshopCtrl.$inject = ['emailSrv', '$scope'];
    function workshopCtrl(emailSrv, $scope){
        $scope.form = {
            toEmail: 'COFW Treasurer<cofwtreasurer@gmail.com>, COFW Developer<cofwwebdeveloper@gmail.com>, COFW President<cofwpresident@gmail.com>',
            text: null,
            html: null,
            subject: 'Workshop Registration Submitted',
            key: 'clean',
            user: {
                firstName: null,
                lastName: null,
                address: null,
                city: null,
                state: null,
                zip: null,
                payPalAccount: null,
                phone: null,
                email: null,
                isMember: false,
                diet: null
            },
            catchMe: null
        };

        $scope.sendEmail = function(){
            if($scope.form.catchMe){
                return;
            }
            $scope.sending = true;
            var template = emailSrv.template();
            template = template.replace('<name>', $scope.form.user.firstName + ' ' + $scope.form.user.lastName);
            template = template.replace('<sAddress>', $scope.form.user.address);
            template = template.replace('<city>', $scope.form.user.city);
            template = template.replace('<state>', $scope.form.user.state);
            template = template.replace('<zip>', $scope.form.user.zip);
            template = template.replace('<paypal>', $scope.form.user.payPalAccount);
            template = template.replace('<phone>', $scope.form.user.phone);
            template = template.replace('<email>', $scope.form.user.email);
            template = template.replace('<isMember>', $scope.form.user.isMember ? 'Yes' : 'No');
            template = template.replace('<diet>', `${($scope.form.user.diet ? $scope.form.user.diet : 'None')}`);
            $scope.form.text = template;
            $scope.form.html = $scope.form.text.replace('\n', '<br>');
            emailSrv.sendEmail($scope.form).then(function(resp){
                console.log(resp);
                if(resp && resp.status === 200){
                    $scope.sent = true;
                } else {
                    console.log('error', resp);
                }
            }, function(resp){
                console.log(resp, 'error');
            }).finally(function(){
                $scope.sending = false;
            });
        }
    }
}());