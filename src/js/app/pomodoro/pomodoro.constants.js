(function() {
    'use strict';

    angular
        .module('pomodoro')
        .constant("constants", {
            TIMER_INITIAL_VALUE: 1500,
            TIMER_INCREMENT: 1,
            MSEC_RATIO: 1000
        });
})();