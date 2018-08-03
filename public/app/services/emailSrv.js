(function(){
    'use strict';
    angular.module('cofw.core')
        .factory('emailSrv', emailSrv);
    emailSrv.$inject = ['$q', '$http'];
    function emailSrv($q, $http){

        var template = "Registration for 2018 Workshop\nName: <name>\nStreet Address: <sAddress>\nCity: <city>\nState: <state>\nZip: <zip>\nPaypal Account Name: <paypal>\nPhone: <phone>\nEmail: <email>\nCOFW Member: <isMember>";

        var memberTemplate = "Name: <name>\nDisplayed Name: <displayName>\nEmail: <email>\nDisplay Email?: <displayEmail>\nWebsite: <website>\nFacebook: <facebook>\nTwitter: <twitter>\nPinterest: <pinterest>\nGoogle Plus: <googlePlus>\nNovels: <novels>\nNovellas: <novellas>\nBlurb: <blurb>";

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
            },
            memberTemplate: function(){
                return memberTemplate;
            }
        }
    }
}());