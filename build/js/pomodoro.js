/**
 * Created by Inhuman on 31.10.2015.
 */
angular.module("pomodoro", []).config(function () {
    "use strict";

    console.info("app init");
});
;/**
 * Created by Inhuman on 31.10.2015.
 */
angular.module("pomodoro").controller("TimerController", ["$scope", function ($scope) {
    "use strict";

    $scope.value = "00:00:00";
}]);
