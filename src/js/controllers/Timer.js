/**
 * Created by Inhuman on 31.10.2015.
 */
angular.module("pomodoro").controller("TimerController",
    [
        "$scope",
        "$element",
        "$interval",
        "$filter",
        "storage",
        "constants",

        function ($scope, $element, $interval, $filter, storage, constants) {
            "use strict";
            //console.log(constants);

            //var INCREMENT =  constants.TIMER_INCREMENT * constants.MSEC_RATIO,
            //    INITIAL_VALUE = constants.TIMER_INITIAL_VALUE * constants.MSEC_RATIO,
            //    lapStart = null,
            //    lapEnd = null,
            //    timer;
            //
            //$scope.timerValue = new Date(INITIAL_VALUE);
            //$scope.formattedValue = timeFormatter($scope.timerValue);
            //$scope.isRunning = false;

            //TODO: I don't like this use of Promise
            //storage.then(function (module) {
            //    $scope.storage = module;
            //});

            //$scope.toggleTimer = function () {
            //
            //    if ($scope.isRunning) {
            //        stopTimer();
            //    } else {
            //        startTimer();
            //    }
            //
            //    $scope.isRunning = !$scope.isRunning;
            //};
            //
            //$scope.clearTimer = function () {
            //    if ($scope.isRunning) {
            //        $scope.toggleTimer();
            //    }
            //
            //    updateTimer(INITIAL_VALUE);
            //};
            //
            //function isElapsed() {
            //    return $scope.timerValue.getTime() === 0;
            //}
            //
            //function oneTick() {
            //    updateTimer(+$scope.timerValue - INCREMENT);
            //    if (isElapsed()) {
            //        console.log("time is up!");
            //        $scope.clearTimer();
            //    }
            //}
            //
            //function startTimer () {
            //    timer = $interval(oneTick, INCREMENT);
            //    lapStart = new Date();
            //    console.info("timer started");
            //}
            //
            //function stopTimer () {
            //    timer =  $interval.cancel(timer);
            //    lapEnd = new Date();
            //    saveLap();
            //    console.info("timer stopped");
            //}
            //
            //function updateTimer (value) {
            //    $scope.timerValue.setTime(value);
            //    $scope.formattedValue = timeFormatter($scope.timerValue);
            //    switchColor();
            //}
            //
            //function timeFormatter (date) {
            //    return $filter('date')(date, "mm:ss", "utc");
            //}
            //
            //$scope.saveLap = function () {
            //    console.log("saving..", lapStart.toISOString(), lapEnd.toISOString());
            //    $scope.storage.save(lapStart, lapEnd);
            //}
            //
            //function switchColor () {
            //     $scope.timerClass = $scope.timerValue.getTime() <= 60*INCREMENT ?
            //         "red-timer" :
            //         "";
            //}

        }
    ]
);

