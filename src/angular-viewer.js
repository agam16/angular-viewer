/**
 * @ngDoc directive
 * @name ng.directive:viewer
 *
 * @description
 * A directive to aid in angular viewer for zoom in & rotate methods
 *
 * @element EA
 *
 */
angular.module('angularViewer', []).directive('iViewer', function($timeout) {

    /**
     * The angular return value required for the directive
     * Feel free to tweak / fork values for your application
     */
    return {

        // Restrict to elements and attributes
        restrict: 'EA',
        replace: true,

        // Assign the angular link function
        link: fieldLink,

        // Assign the angular directive template HTML
        template: fieldTemplate,

        // Assign the angular scope attribute formatting
        scope: {
            viewerOptions: '=',
            viewerFile: '='
        }
    };


    /**
     * Link the directive to enable our scope watch values
     *
     * @param {object} scope - Angular link scope
     * @param {object} el - Angular link element
     * @param {object} attrs - Angular link attribute
     */
    function fieldLink(scope, elem, attrs) {
        initOptions = function() {
            scope.viewerOptions.updateOnResize = typeof scope.viewerOptions.updateOnResize !== 'undefined' ? scope.viewerOptions.updateOnResize : true;
            scope.viewerOptions.zoomAnimation = typeof scope.viewerOptions.zoomAnimation !== 'undefined' ? scope.viewerOptions.zoomAnimation : true;
            scope.viewerOptions.useMouseWheel = typeof scope.viewerOptions.useMouseWheel !== 'undefined' ? scope.viewerOptions.useMouseWheel : true;
            scope.viewerOptions.showToolbarButtons = typeof scope.viewerOptions.showToolbarButtons !== 'undefined' ? scope.viewerOptions.showToolbarButtons : true;
            scope.viewerOptions.startZoom = typeof scope.viewerOptions.startZoom !== 'undefined' ? scope.viewerOptions.startZoom : 'fit';
            //TODO Fix
            scope.viewerOptions.minZoom = typeof scope.viewerOptions.minZoom !== 'undefined' ? scope.viewerOptions.minZoom : 'fit';
            console.log(scope.viewerOptions)
        }
        initViewer = function() {
            initOptions()
            $(elem).iviewer({
                src: scope.viewerFile,
                zoom_min: scope.viewerOptions.minZoom,
                update_on_resize: scope.viewerOptions.updateOnResize,
                zoom_animation: scope.viewerOptions.zoomAnimation,
                mousewheel: scope.viewerOptions.useMouseWheel,
                ui_disabled: !scope.viewerOptions.showToolbarButtons,
                zoom: scope.viewerOptions.startZoom,
                mousewheel: scope.viewerOptions.useMouseWheel
            });
            // $(elem).iviewer('update')
        }
        $timeout(initViewer, 1500);
    }


    /**
     * Create our template html 
     * We use a function to figure out how to handle href correctly
     * 
     * @param {object} el - Angular link element
     * @param {object} attrs - Angular link attribute
     */
    function fieldTemplate(el, attrs) {
        return '<div id="viewer" class="viewer"></div>'
    }
});
