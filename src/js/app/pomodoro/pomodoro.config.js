(function() {
    "use strict";

    angular
        .module("pomodoro")
        .config(configure)
        .run(run);

    configure.$inject = [
        "$routeProvider",
        "$locationProvider",
        "timerStorageProvider"
    ];

    function configure($routeProvider, $locationProvider, timerStorageProvider) {

        timerStorageProvider.setId("pomodoro");

        $routeProvider
            .when('/pomodoro', {
                templateUrl: 'js/app/pomodoro/pomodoro.html',
                controller: 'PomodoroController'
            });

        $locationProvider.html5Mode({
            enabled: true
        });
    }

    function run() {
        console.log("pomodoro run");        
    }
})();