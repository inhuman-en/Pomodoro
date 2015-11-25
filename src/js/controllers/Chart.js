/**
 * Created by Inhuman on 25.11.2015.
 */
angular.module("pomodoro").controller("ChartController",
    [
        "$scope",
        "highchartsNG",

        function ($scope) {
            "use strict";

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
                $scope.chartConfig.series[0].data = $scope.$storage.timerHistory.map(function (lap) {
                    return {
                        x: new Date(lap.start),
                        y: Math.round(lap.duration / 1000)
                    };
                })
            }
        }
    ]
);

