'use strict';

/* Directives */
angular.module('datetime', [])
        .directive('bsDatetimepicker', function($compile, $timeout) {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        scope: {
            bsDatetimepicker: '='
        },
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {
            $(element).datetimepicker({
                format: "dd/mm/yyyy hh:ii",
                autoclose: true,
                todayBtn: true,
                minuteStep: 15,
                language: 'pt-BR'
            }).on('changeDate', function(ev) {
                console.log('date: ' + ev.date);
                console.log('date: ', ev);
                console.log('toJSON: ', ev.date.toJSON());
                console.log('toUTCString: ', ev.date.toUTCString());
                console.log('toString: ', ev.date.toString());
                console.log('valueOf: ', ev.date.valueOf());
                console.log('toISOString: ', ev.date.toISOString());
                console.log('getTimezoneOffset: ', ev.date.getTimezoneOffset());

                var dateUTC = new Date(ev.date.getTime() + (ev.date.getTimezoneOffset() * 60000));
                scope.bsDatetimepicker = dateUTC;
                scope.$apply();
            });
        }
    };
}).directive('bDatepicker', function() {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function($scope, element, attrs, controller) {
            var updateModel, onblur;

            if (controller != null) {

                updateModel = function(ev) {
                    element.datepicker('hide');
                    element.blur();
                    console.log('date: ' + ev.date);
                    console.log('date: ', ev);
                    console.log('toJSON: ', ev.date.toJSON());
                    console.log('toUTCString: ', ev.date.toUTCString());
                    console.log('toString: ', ev.date.toString());
                    console.log('valueOf: ', ev.date.valueOf());
                    console.log('toISOString: ', ev.date.toISOString());
                    console.log('getTimezoneOffset: ', ev.date.getTimezoneOffset());

                    var dateUTC = new Date(ev.date.getTime() + (ev.date.getTimezoneOffset() * 60000));
                    return $scope.$apply(function() {
                        return controller.$setViewValue(dateUTC);
                    });
                };

                onblur = function() {
                    //we'll update the model in the blur() handler
                    //because it's possible the user put in an invalid date
                    //in the input box directly.
                    //Bootstrap datepicker will have overwritten invalid values
                    //on blur with today's date so we'll stick that in the model.
                    //this assumes that the forceParse option has been left as default(true)
                    //https://github.com/eternicode/bootstrap-datepicker#forceparse
                    var date = element.val();
                    return $scope.$apply(function() {
                        return controller.$setViewValue(date);
                    });
                };

                controller.$render = function() {
                    var date = controller.$viewValue;
                    if (angular.isDefined(date) && date != null && angular.isDate(date))
                    {
                        element.datepicker().data().datepicker.date = date;
                        element.datepicker('setValue');
                        element.datepicker('update');
                    } else if (angular.isDefined(date)) {
                        date = new Date(date);
                        element.datepicker().data().datepicker.date = date;
                        element.datepicker('setValue');
                        element.datepicker('update');
//                        throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
                    }
                    return controller.$viewValue;
                };
            }
            return attrs.$observe('bdatepicker', function(value) {
                var options;
                options = {
                    format: "dd/mm/yyyy",
                    autoclose: true,
                    todayBtn: false,
                    language: 'pt-BR'
                }; //<--- insert your own defaults here!
                if (angular.isObject(value)) {
                    options = value;
                }
                if (typeof (value) === "string" && value.length > 0) {
                    options = angular.fromJson(value);
                }
                return element.datepicker(options).on('changeDate', updateModel).on('blur', onblur);
            });
        }
    };
});