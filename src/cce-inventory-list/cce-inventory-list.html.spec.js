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

describe('cce-inventory-list template', function () {

    var template, $compile, $rootScope, $scope, $templateRequest, $controller, vm,
        authorizationService, $timeout, $state;

    beforeEach(function() {
        module('cce-inventory-list', function($provide) {
            $provide.factory('openlmisPaginationDirective', function() {
                return {};
            });
        });

        inject(function($injector) {
            $controller = $injector.get('$controller');
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            $templateRequest = $injector.get('$templateRequest');
            $timeout = $injector.get('$timeout');
            $state = $injector.get('$state');
            authorizationService = $injector.get('authorizationService');
        });

        spyOn(authorizationService, 'hasRight');
        spyOn($state, 'go');
    });

    describe('Add Inventory Item button', function() {

        it('should be hidden if user has no rights to edit', function() {
            authorizationService.hasRight.andReturn(false);

            prepareView();

            expect(getAddInventoryButton().hasClass('ng-hide')).toBe(true);
        });

        it('should be visible if user has rights to edit', function() {
            authorizationService.hasRight.andReturn(true);

            prepareView();

            expect(getAddInventoryButton().hasClass('ng-hide')).toBe(false);
        });

        it('should take user to the add inventory item modal', function() {
            authorizationService.hasRight.andReturn(true);

            prepareView();

            getAddInventoryButton().click();
            $timeout.flush();

            expect($state.go.calls[0].args[0]).toEqual('openlmis.cce.inventory.add');
        });

    });

    function prepareView() {
        vm = $controller('CceInventoryListController', {
            inventoryItems: undefined
        });
        vm.$onInit();

        $scope = $rootScope.$new();
        $scope.vm = vm;

        $templateRequest("cce-inventory-list/cce-inventory-list.html").then(function(requested) {
            template = $compile(requested)($scope);
        });
        $rootScope.$apply();
    }

    function getAddInventoryButton() {
        var result;

        angular.forEach(template.find('button'), function(button) {
            var element = angular.element(button);
            if (element.attr('id') === 'add-inventory-item') {
                result = element;
            }
        });

        return result;
    }
});
