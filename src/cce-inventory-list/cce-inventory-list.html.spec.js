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

    var template, $rootScope, $scope, vm, authorizationService, $timeout, $state,
        templateTestingUtils, inventoryItem, inventoryItemId, FacilityProgramInventoryItemDataBuilder;

    beforeEach(function() {
        loadModules();
        injectServices();
        prepareTestData();
        initTestingUtils(this);

        spyOn(authorizationService, 'hasRight');
        spyOn($state, 'go');
    });

    describe('Add Inventory Item button', function() {

        it('should be hidden if user has no rights to edit', function() {
            prepareView();

            vm.userHasRightToEdit = false;
            $rootScope.$apply();

            expect(templateTestingUtils.getButton('add-inventory-item')).toBeHidden();
        });

        it('should be visible if user has rights to edit', function() {
            prepareView();

            vm.userHasRightToEdit = true;
            $rootScope.$apply();

            expect(templateTestingUtils.getButton('add-inventory-item')).not.toBeHidden();
        });

        it('should take user to the add inventory item modal', function() {
            prepareView();

            vm.userHasRightToEdit = true;
            $rootScope.$apply();

            templateTestingUtils.getButton('add-inventory-item').click();
            $timeout.flush();

            expect($state.go.calls[0].args[0]).toEqual('openlmis.cce.inventory.add');
        });

    });

    describe('Update Status button', function() {

        it('should be visible if user has rights to edit', function() {
            prepareView();

            expect(template.find('#functional-status')).not.toBeHidden();
        });

        it('should take user to the add inventory item modal', function() {
            prepareView();

            template.find('#functional-status').click();
            $timeout.flush();

            expect($state.go.calls[0].args[0]).toEqual('openlmis.cce.inventory.statusUpdate');
        });

    });

    describe('View button', function() {

        it('should take user to the Inventory Item Details page', function() {
            prepareView();

            templateTestingUtils.getInputs('inventory-item-details')[0].click();
            $timeout.flush();

            expect($state.go.calls[0].args[0]).toEqual('.details');
        });

    });

    function loadModules() {
        module('openlmis-testing-utils');
        module('cce-inventory-list', function($provide) {
            $provide.factory('openlmisPaginationDirective', function() {
                return {};
            });
        });
    }

    function injectServices() {
        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $timeout = $injector.get('$timeout');
            $state = $injector.get('$state');
            authorizationService = $injector.get('authorizationService');
            templateTestingUtils = $injector.get('templateTestingUtils');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
        });
    }

    function prepareTestData() {
        inventoryItem = new FacilityProgramInventoryItemDataBuilder().build();
    }

    function initTestingUtils(suite) {
        templateTestingUtils.init(suite);
    }

    function prepareView() {
        var testContext = templateTestingUtils.prepareView(
            'cce-inventory-list/cce-inventory-list.html',
            'CceInventoryListController', {
                inventoryItems: [
                    inventoryItem
                ]
            });

        vm = testContext.$scope.vm;
        template = testContext.template;
    }
});
