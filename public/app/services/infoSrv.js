(function(){
    'use strict';
    angular.module('cofw.core')
        .factory('infoSrv', infoSrv);
    function infoSrv(){
        var information = {
            president: 'Jane Conner',
            treasurer: 'Stacy McKitrick',
            secretary: 'Someone Somewhere'
        };

        var contactInfo = {
            contactEmail: 'COFWpresident@gmail.com',
            contactName: 'Jane Conner'
        };

        return{
            getInformation: function(){
                return information;
            },
            getContactInfo: function(){
                return contactInfo;
            }
        }
    }
}());