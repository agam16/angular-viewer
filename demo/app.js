(function() {
    'use strict';
    angular.module("myApp", ['angularViewer']).controller('exampleCtrl', exampleCtrl)

    function exampleCtrl() {
        var vm = this;
        vm.options = [];
        vm.imageUrl = 'test-image.png'
    }
})();