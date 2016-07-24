/**
 * Created by Inhuman on 31.10.2015.
 */
angular.module("pomodoro", [
        "highcharts-ng",
        "ngRoute"
    ])
    .config([
        "$routeProvider",
        "$locationProvider",
        "localStorageProvider",
        function($routeProvider, $locationProvider, localStorageProvider) {
            "use strict";

            console.info("app init", localStorageProvider);

            localStorageProvider.setId("hello");


            $routeProvider
                .when('/timer', {
                    templateUrl: 'views/timer.html',
                    controller: 'PomodoroController'
                });

            $locationProvider.html5Mode({
                enabled: true
            });
        }
    ]);