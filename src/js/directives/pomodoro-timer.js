/**
 * Created by Inhuman on 05.12.2015.
 */
angular.module("pomodoro")
    .directive('pomodoroTimer', function () {

        return {
            restrict: 'E',
            templateUrl: 'js/directives/pomodoro-timer.html',
            scope: {
                afterSave: '&afterSave'
            },
            controller: [

                "$scope",
                "$interval",
                "$filter",
                "storage",
                "constants",

                function ($scope, $interval, $filter, storage, constants) {

                var INCREMENT =  constants.TIMER_INCREMENT * constants.MSEC_RATIO,
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
                        $scope.toggleTimer();
                    }

                    updateTimer(INITIAL_VALUE);
                };

                function isElapsed () {
                    return $scope.timerValue.getTime() === 0;
                }

                function oneTick () {
                    updateTimer(+$scope.timerValue - INCREMENT);
                    if (isElapsed()) {
                        console.log("time is up!");
                        $scope.clearTimer();
                    }
                }

                function startTimer () {
                    timer = $interval(oneTick, INCREMENT);
                    lapStart = new Date();
                    console.info("timer started");
                }

                function stopTimer () {
                    timer = $interval.cancel(timer);
                    lapEnd = new Date();
                    saveLap();
                    console.info("timer stopped");
                }

                function updateTimer (value) {
                    $scope.timerValue.setTime(value);
                    $scope.formattedValue = timeFormatter($scope.timerValue);
                    switchColor();
                }

                function timeFormatter (date) {
                    return $filter('date')(date, "mm:ss", "utc");
                }

                function saveLap () {
                    console.log("saving..", lapStart.toISOString(), lapEnd.toISOString());
                    storage.save(lapStart, lapEnd);
                    $scope.afterSave();
                }

                function switchColor () {
                    $scope.timerClass = $scope.timerValue.getTime() <= 60 * INCREMENT ?
                        "red-timer" :
                        "";
                }
            }]
        };
    });
