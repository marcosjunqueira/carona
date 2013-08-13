'use strict';

/* Services */
var facebookServices = angular.module('facebookServices', []);
/* Servicos do Facebook */
facebookServices.factory('facebook', ['$window', function($window) {
        //get FB from the global (window) variable.
        var FB = $window.FB;

        // gripe if it's not there.
        if (!FB)
            throw new Error('Facebook not loaded');

        //make sure FB is initialized.
        FB.init({
            appId: '111329828949540', // App ID from the app dashboard
            channelUrl: '//localhost:8080/caronauniversitaria/channel.html', // Channel file for x-domain comms
            status: true, // Check Facebook Login status
//            authResponse: {accessToken: '${accessToken}'},
            xfbml: true                                  // Look for social plugins on the page
        });

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/pt_BR/all.js#xfbml=1&appId=111329828949540";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        return {
            me: function(callback) {
                FB.api('/me', callback);
            },
            getLoginStatus: function(callback) {
                FB.getLoginStatus(callback);
            },
            getAuthResponse: function(callback) {
                FB.getAuthResponse(callback);
            },
            login: function(callback, opts) {
                FB.login(callback, opts);
            },
            logout: function(callback) {
                FB.logout(callback);
            },
            ui: function(params, callback) {
                FB.ui(params, callback);
            },
            apiCreate: function(url, object, callback) {
                FB.api(url, 'post', object, callback);
            },
            apiRead: function(url, callback) {
                FB.api(url, 'get', callback);
            },
            apiUpdate: function(createId, object, callback) {
                FB.api(createId, "post", object, callback);
            },
            apiDelete: function(createId, callback) {
                FB.api(createId, "delete", callback);
            },
            offerRide: function(callback) {
                FB.api(
                        'me/caronauniversitaria:offer',
                        'post',
                        {
                            ride: "https://www.caronauniversitaria.net/confirmation/51795939e4b00edc37480708"
                        }, callback);
            },
            offerRideCB: function(callback) {
                FB.api(
                        'me/caronabrasil:offer',
                        'post',
                        {
                            ride: "http://samples.ogp.me/455016394580880"
                        }, callback);

            }

            //TODO: Add any other functions you need here, login() for example.
        };
    }]);

