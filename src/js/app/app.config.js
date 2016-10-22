(function() {
    "use strict";

    angular
        .module("app")
        .config(configure)
        .run(run);

    function configure() {
        console.log("app module config");
    }

    function run() {
        console.log("app module run");        
    }
})();