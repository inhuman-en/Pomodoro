(function () {
    'use strict';

    angular
        .module('pomodoro')
        //todo: move to component
        .directive('pomodoroTimer', PomodoroTimer);

    function PomodoroTimer() {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/app/pomodoro/pomodoro-timer.directive.html',
            scope: {
                onStop: '&onStop'
            },
            controller: PomodoroTimerController
        };

        return directive;
    }

    PomodoroTimerController.$inject = [
        "$scope",
        "$interval",
        "$filter",
        "constants",
        "timerStorage"
    ];

    function PomodoroTimerController($scope, $interval, $filter, constants, storage) {
        var INCREMENT = constants.TIMER_INCREMENT * constants.MSEC_RATIO,
            INITIAL_VALUE = constants.TIMER_INITIAL_VALUE * constants.MSEC_RATIO,
            lapStart = null,
            lapEnd = null,
            timer;

        $scope.timerValue = new Date(INITIAL_VALUE);
        $scope.formattedValue = timeFormatter($scope.timerValue);
        $scope.isRunning = false;

        $scope.toggleTimer = function () {

            if ($scope.isRunning) {
                stopTimer();
            } else {
                startTimer();
            }

            $scope.isRunning = !$scope.isRunning;
        };

        $scope.clearTimer = function () {
            if ($scope.isRunning) {
                $scope.stopTimer();
            }

            updateTimer(INITIAL_VALUE);
        };

        function isElapsed() {
            return $scope.timerValue.getTime() === 0;
        }

        function oneTick() {
            updateTimer(+$scope.timerValue - INCREMENT);
            if (isElapsed()) {
                console.log("time is up!");
                $scope.clearTimer();
            }
        }

        function startTimer() {
            timer = $interval(oneTick, INCREMENT);
            lapStart = new Date();
            console.info("timer started");
        }

        function stopTimer() {
            timer = $interval.cancel(timer);
            lapEnd = new Date();
            saveLap();
            console.info("timer stopped");
        }

        function updateTimer(value) {
            $scope.timerValue.setTime(value);
            $scope.formattedValue = timeFormatter($scope.timerValue);
            switchColor();
        }

        function timeFormatter(date) {
            return $filter('date')(date, "mm:ss", "utc");
        }

        function saveLap() {
            // todo: timer sholdn't know about storage
            //(how to pass lapStart, lapEnd to wrapping controller?)
            console.log("saving..", lapStart.toISOString(), lapEnd.toISOString());
            storage.save(lapStart, lapEnd);
            $scope.onStop(lapStart, lapEnd);
        }

        function switchColor() {
            $scope.timerClass = $scope.timerValue.getTime() <= 60 * INCREMENT ?
                "red-timer" :
                "";
        }

    }

})();