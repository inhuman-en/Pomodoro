/**
 * Created by Inhuman on 31.10.2015.
 */
angular.module("pomodoro",[
        "ngStorage",
        "highcharts-ng"

    ]).controller("TimerController",
    [
        "$scope",
        "$interval",
        "$filter",
        "$localStorage",
        "highchartsNG",

        function ($scope, $interval, $filter, $localStorage, $highcharts) {
            "use strict";
            $scope.$storage = $localStorage;
            $scope.timerValue = new Date(0);
            $scope.formattedValue = "00:00:00";
            $scope.isRunning = false;
            $scope.chartVisible = false;

            $scope.chartConfig = {
                options: {
                    chart: {
                        type: 'line'
                    },
                        xAxis: {
                            type: "datetime"
                        }

                },
                series: [{
                    data: [],
                    color: "green"
                }],
                title: {
                    text: 'Timer History'
                }
            };

            $scope.$storage.timerHistory  = $scope.$storage.timerHistory || [];

            //NOTE: milliseconds
            var increment = 1000,
                lapStart = null,
                lapEnd = null,
                timer;

            function oneTick() {
                updateTimer(+$scope.timerValue + increment);
            }

            function startTimer () {
                timer = $interval(oneTick, increment);
                lapStart = new Date();
            }

            function stopTimer () {
                timer =  $interval.cancel(timer);
                lapEnd = new Date();
                saveLap();
            }

            function updateTimer (value) {
                $scope.timerValue.setTime(value);
                $scope.formattedValue = timeFormatter($scope.timerValue);
            }

            function timeFormatter (date) {
                return $filter('date')(date, "HH:mm:ss", "utc");
            }

            function saveLap () {
                console.log("saving..", lapStart.toISOString(), lapEnd.toISOString());
                $scope.$storage.timerHistory.push({
                    start: lapStart.toISOString(),
                    end: lapEnd.toISOString(),
                    duration: lapEnd - lapStart
                });

                updateChart();
            }

            function updateChart () {
                $scope.chartConfig.series[0].data = $scope.$storage.timerHistory.map(function (lap) {
                    return {
                        x: new Date(lap.start),
                        y: Math.round(lap.duration / 1000)
                    };
                })
            }

            $scope.toggleTimer = function () {

                if ($scope.isRunning) {
                    stopTimer();
                } else {
                    startTimer();
                }

                $scope.isRunning = !$scope.isRunning;
                //console.log("running?", $scope.isRunning);
            }

            $scope.clearTimer = function () {
                if ($scope.isRunning) {
                    $scope.toggleTimer();
                }

                updateTimer(0);
            }

            $scope.showChart = function () {
                $scope.chartVisible = true;

                updateChart();
            }
        }
    ]
);

