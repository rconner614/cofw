(function(){
    'use strict';
    angular.module('cofw.core')
        .factory('emailSrv', emailSrv);
    emailSrv.$inject = ['$q', '$http'];
    function emailSrv($q, $http){

        var template = "Registration for Larry Brooks Workshop\nName: <name>\nStreet Address: <sAddress>\nCity: <city>\nState: <state>\nZip: <zip>\nName to Appear on Badge: <badge>\nPaypal Account Name: <paypal>\nPhone: <phone>\nEmail: <email>\nFood Choice: <food>\nCOFW Member: <isMember>";

        function sendEmail(obj){
            var df = $q.defer();
            $http.post('/email-send', obj).then(function(resp){
                console.log(resp);
                if(resp.status === 200){
                    console.log('working', resp);
                    df.resolve(resp);
                } else {
                    df.reject(resp);
                }
            }, function(resp){
                df.reject(resp);
            });
            return df.promise;
        }

        return {
            sendEmail: sendEmail,
            template: function(){
                return template;
            }
        }
    }
}());