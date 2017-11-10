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

describe('InventoryItemDetailsController', function() {

    var vm, inventoryItem, CCE_STATUS, MANUAL_TEMPERATURE_GAUGE_TYPE, UTILIZATION_STATUS,
        REMOTE_TEMPERATURE_MONITOR_TYPE, FUNCTIONAL_STATUS, $controller, $state,
        authorizationService, CCE_RIGHTS;

    beforeEach(prepareSuite);

    describe('$onInit', function() {

        it('should expose inventoryItem', function() {
            vm.$onInit();

            expect(vm.inventoryItem).toEqual(inventoryItem);
        });

        it('should expose getStatusLabel function', function() {
            vm.$onInit();

            expect(vm.getStatusLabel).toBe(CCE_STATUS.getLabel);
        });

        it('should expose getManualTemperatureGaugeTypeLabel', function() {
            vm.$onInit();

            expect(vm.getManualTemperatureGaugeTypeLabel)
                .toBe(MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel);
        });

        it('should expose getRemoteTemperatureMonitorTypeLabel', function() {
            vm.$onInit();

            expect(vm.getRemoteTemperatureMonitorTypeLabel)
                .toBe(REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel);
        });

        it('should expose getUtilizationStatusLabel', function() {
            vm.$onInit();

            expect(vm.getUtilizationStatusLabel).toBe(UTILIZATION_STATUS.getLabel);
        });

        it('should display edit button if user has right', function() {
            spyOn(authorizationService, 'hasRight').andReturn(true);

            vm.$onInit();

            expect(vm.userHasRightToEdit).toBe(true);
            expect(authorizationService.hasRight).toHaveBeenCalledWith(CCE_RIGHTS.CCE_INVENTORY_EDIT, {
                programCode: vm.inventoryItem.program.code
            });
        });

        it('should hide edit button if user does not has right', function() {
            spyOn(authorizationService, 'hasRight').andReturn(false);

            vm.$onInit();

            expect(vm.userHasRightToEdit).toBe(false);
            expect(authorizationService.hasRight).toHaveBeenCalledWith(CCE_RIGHTS.CCE_INVENTORY_EDIT, {
                programCode: vm.inventoryItem.program.code
            });
        });

    });

    describe('goToStatusUpdate', function() {

        it('should take user to the status update page', function() {
            vm.goToStatusUpdate(inventoryItem);

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.statusUpdate', {
                inventoryItem: inventoryItem,
                inventoryItemId: inventoryItem.id
            });
        });

    });

    describe('goToEditPage', function() {

        it('should take user to the inventory item edit page', function() {
            vm.goToEditPage(inventoryItem);

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.edit', {
                inventoryItem: inventoryItem,
                inventoryItemId: inventoryItem.id
            });
        });

    });

    describe('getFunctionalStatusClass', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return is-functioning for FUNCTIONING', function() {
            vm.inventoryItem.functionalStatus = 'FUNCTIONING';

            expect(vm.getFunctionalStatusClass()).toEqual('is-functioning');
        });

        it('should return is-obsolete for OBSOLETE', function() {
            vm.inventoryItem.functionalStatus = 'OBSOLETE';

            expect(vm.getFunctionalStatusClass()).toEqual('is-obsolete');
        });

        it('should return is-non-functioning for NON_FUNCTIONING', function() {
            vm.inventoryItem.functionalStatus = 'NON_FUNCTIONING';

            expect(vm.getFunctionalStatusClass()).toEqual('is-non-functioning');
        });

    });

    describe('getFunctionalStatusLabel', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return Functioning for FUNCTIONING', function() {
            vm.inventoryItem.functionalStatus = 'FUNCTIONING';

            expect(vm.getFunctionalStatusLabel()).toEqual('cceInventoryItemStatus.functioning');
        });

        it('should return Obsolete for OBSOLETE', function() {
            vm.inventoryItem.functionalStatus = 'OBSOLETE';

            expect(vm.getFunctionalStatusLabel()).toEqual('cceInventoryItemStatus.obsolete');
        });

        it('should return Non-functioning for NON_FUNCTIONING', function() {
            vm.inventoryItem.functionalStatus = 'NON_FUNCTIONING';

            expect(vm.getFunctionalStatusLabel()).toEqual('cceInventoryItemStatus.nonFunctioning');
        });

    });

    function prepareSuite() {
        module('cce-inventory-item-details');
        inject(services);
        prepareTestData();
        prepareSpies();
        prepareController();
    }

    function services($injector) {
        $controller = $injector.get('$controller');
        CCE_STATUS = $injector.get('CCE_STATUS');
        CCE_RIGHTS = $injector.get('CCE_RIGHTS');
        MANUAL_TEMPERATURE_GAUGE_TYPE = $injector.get('MANUAL_TEMPERATURE_GAUGE_TYPE');
        REMOTE_TEMPERATURE_MONITOR_TYPE = $injector.get('REMOTE_TEMPERATURE_MONITOR_TYPE');
        UTILIZATION_STATUS = $injector.get('UTILIZATION_STATUS');
        FUNCTIONAL_STATUS = $injector.get('FUNCTIONAL_STATUS');
        $state = $injector.get('$state');
        authorizationService = $injector.get('authorizationService');
    }

    function prepareTestData() {
        inventoryItem = {
            id: 'c699115e-3572-4a8f-951c-1297bc4f7995',
            program: {
                code: 'PRG01'
            }
        };
    }

    function prepareSpies() {
        spyOn($state, 'go');
    }

    function prepareController() {
        vm = $controller('InventoryItemDetailsController', {
            inventoryItem: inventoryItem
        });
    }

});
