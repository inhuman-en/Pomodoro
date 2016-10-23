(function () {
    'use strict';

    angular
        .module('pomodoro')
        .component('pomodoroTimer', {
                templateUrl: 'js/app/pomodoro/pomodoro-timer.component.html',
                bindings: {
                    onStop: '&onStop'
                },
                controller: PomodoroTimerController
            });

    PomodoroTimerController.$inject = [
        "$scope",
        "$interval",
        "$filter",
        "constants"
    ];

    //todo: get rid of $scope
    function PomodoroTimerController($scope, $interval, $filter, constants) {
        var vm = this,
            INCREMENT = constants.TIMER_INCREMENT * constants.MSEC_RATIO,
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
            vm.onStop({lapStart, lapEnd});
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

        function switchColor() {
            $scope.timerClass = $scope.timerValue.getTime() <= 60 * INCREMENT ?
                "red-timer" :
                "";
        }

    }

})();