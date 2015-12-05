/**
 * Created by Inhuman on 25.11.2015.
 */
angular.module('pomodoro')
    .factory('storage',
        [
            "$http",
            "$injector",

            function storageFactory ($http, $injector) {
                'use strict';

                //return $http.get('/api')
                //    .then(function () {
                //        return $injector.get('api');
                //    }, function () {
                //        return $injector.get('localStorage');
                //    });
                //}

                return $injector.get('localStorage');
            }
        ])
        //TODO: wire backend here
        .factory('api', function () {
            'use strict';

            return null;
        })

        .factory('localStorage', function () {
            'use strict';

            var STORAGE_ID = "timerHistory";

            function _getFromLocalStorage () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            }

            function _saveToLocalStorage (value) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(value));
            }

            return {

                timerHistory: _getFromLocalStorage(),

                save: function (start, end) {

                    this.timerHistory.push({
                        start: start.toISOString(),
                        end: end.toISOString(),
                        duration: end - start
                    });

                    _saveToLocalStorage(this.timerHistory);
                    console.log("saved!");
                }
            };
        });
