/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2017 VillageReach
 *
 * This program is free software: you can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU Affero General Public License for more details. You should have received a copy of
 * the GNU Affero General Public License along with this program. If not, see
 * http://www.gnu.org/licenses.  For additional information contact info@OpenLMIS.org. 
 */

(function() {

    'use strict';

    angular
        .module('openlmis-testing-utils')
        .factory('templateTestingUtils', factory);

    factory.$inject = [];

    function factory() {
        var factory = {};

        factory.init = init;
        factory.prepareView = prepareView;
        factory.getElementById = getElementById;
        factory.getElementsByClass = getElementsByClass;
        factory.getDl = getDl;
        factory.getButton = getButton;
        factory.getInputs = getInputs;

        return factory;

        function init(suite) {
            factory.testSuite = suite;
            addCustomMatcher(factory.testSuite);

            inject(function($injector) {
                factory.$rootScope = $injector.get('$rootScope');
            });
        }

        function prepareView(template, controller, controllerArgs) {
            var testContext = {};

            inject(function($injector) {
                testContext.$scope = factory.$rootScope.$new();
                controllerArgs.$scope = testContext.$scope;

                var vm = $injector.get('$controller')(controller, controllerArgs);
                vm.$onInit();

                testContext.$scope.vm = vm;

                $injector.get('$templateRequest')(template).then(function(requested) {
                    testContext.template = $injector.get('$compile')(requested)(testContext.$scope);
                    factory.template = testContext.template;
                });
                factory.$rootScope.$apply();
            });

            return testContext;
        }

        function getDl(id) {
            return getElementById('dl', id);
        }

        function getButton(id) {
            return getElementById('button', id);
        }

        function getInputs(clazz) {
            return getElementsByClass('input', clazz);
        }

        function getElementById(type, id) {
            var result;

            angular.forEach(factory.template.find(type), function(element) {
                if (angular.element(element).attr('id') === id) {
                    result = angular.element(element);
                }
            });

            return result;
        }

        function getElementsByClass(type, clazz) {
            var result = [];
            angular.forEach(factory.template.find(type), function(element) {
                if (angular.element(element).hasClass(clazz)) {
                    result.push(angular.element(element));
                }
            });

            return result;
        }

        function addCustomMatcher(suite) {
            suite.addMatchers({
                toBeRequired: toBeRequired,
                toBeHidden: toBeHidden
            });
        }

        function toBeRequired() {
            var pass = this.actual.prop('required');

            if (pass) {
                this.message = function() {
                    return 'Element is required';
                };
            } else {
                this.message = function() {
                    return 'Element must be required';
                };
            }

            return pass;
        }

        function toBeHidden() {
            var pass = this.actual.hasClass('ng-hide');

            if (pass) {
                this.message = function() {
                    return 'Element is visible';
                };
            } else {
                this.message = function() {
                    return 'Element must be hidden';
                };
            }

            return pass;
        }
    }

})();
