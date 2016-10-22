(function () {
    'use strict';

    angular.module('pomodoro')
        //note: registered as provider just for example 
        .provider('timerStorage', function () {
            var prefix = "timerHistory-",
                calculatedId = prefix;

            return {

                setId: function (id) {
                    calculatedId += id;
                },

                $get: function () {
                    return TimerStorageFactory(calculatedId);
                }

            };
        });

    TimerStorageFactory.$inject = [];

    function TimerStorageFactory(id) {
        'use strict';

        var STORAGE_ID = id;

        function _getFromLocalStorage() {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        }

        function _saveToLocalStorage(value) {
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
    }
})();