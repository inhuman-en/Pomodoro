(function() {
    'use strict';

    angular
        .module('pomodoro')
        .controller('PomodoroController', PomodoroController);

    PomodoroController.$inject = ["$scope", "timerStorage"];

    function PomodoroController($scope, storage) {
        "use strict";

        //todo: xAxis in local time
        //todo: chart styling
console.log(storage);
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

        $scope.showChart = function() {
            $scope.chartVisible = true;

            updateChart();
        };

        $scope.onTimerStop = function (lapStart, lapEnd) {
            console.log(lapStart, lapEnd);
            storage.save(lapStart, lapEnd);
            $scope.showChart();
        }

        function updateChart() {
            $scope.chartConfig.series[0].data = storage.timerHistory.map(function(lap) {
                return {
                    x: new Date(lap.start),
                    y: Math.round(lap.duration / 1000)
                };
            })
        }
    }
})();