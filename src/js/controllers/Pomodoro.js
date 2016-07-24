/**
 * Created by Inhuman on 25.11.2015.
 */
//TODO: now this controls more than chart, rename
angular.module("pomodoro").controller("PomodoroController",
    [
        "$scope",
        "storage",

        function ($scope, storage) {
            "use strict";

            //TODO: xAxis in local time
            //TODO: chart styling

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

            $scope.showChart = function () {
                $scope.chartVisible = true;

                updateChart();
            };

            function updateChart () {
                $scope.chartConfig.series[0].data = storage.timerHistory.map(function (lap) {
                    return {
                        x: new Date(lap.start),
                        y: Math.round(lap.duration / 1000)
                    };
                })
            }
        }
    ]
);

