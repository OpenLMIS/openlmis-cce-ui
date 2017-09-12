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
        REMOTE_TEMPERATURE_MONITOR_TYPE, FUNCTIONAL_STATUS, $controller, $state;

    beforeEach(prepareSuite);

    describe('$onInit', function() {

        it('should expose inventoryItem', function() {
            expect(vm.inventoryItem).toEqual(inventoryItem);
        });

        it('should expose getStatusLabel function', function() {
            expect(vm.getStatusLabel).toBe(CCE_STATUS.getLabel);
        });

        it('should expose getManualTemperatureGaugeTypeLabel', function() {
            expect(vm.getManualTemperatureGaugeTypeLabel)
                .toBe(MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel);
        });

        it('should expose getRemoteTemperatureMonitorTypeLabel', function() {
            expect(vm.getRemoteTemperatureMonitorTypeLabel)
                .toBe(REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel);
        });

        it('should expose getUtilizationStatusLabel', function() {
            expect(vm.getUtilizationStatusLabel).toBe(UTILIZATION_STATUS.getLabel);
        });

        it('should expose getFunctionalStatusLabel', function() {
            expect(vm.getFunctionalStatusLabel).toBe(FUNCTIONAL_STATUS.getLabel);
        });

        it('should expose getFunctionalStatusClass', function() {
            expect(vm.getFunctionalStatusClass).toBe(FUNCTIONAL_STATUS.getClass);
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
        MANUAL_TEMPERATURE_GAUGE_TYPE = $injector.get('MANUAL_TEMPERATURE_GAUGE_TYPE');
        REMOTE_TEMPERATURE_MONITOR_TYPE = $injector.get('REMOTE_TEMPERATURE_MONITOR_TYPE');
        UTILIZATION_STATUS = $injector.get('UTILIZATION_STATUS');
        FUNCTIONAL_STATUS = $injector.get('FUNCTIONAL_STATUS');
        $state = $injector.get('$state');
    }

    function prepareTestData() {
        inventoryItem = {
            id: 'c699115e-3572-4a8f-951c-1297bc4f7995'
        };
    }

    function prepareSpies() {
        spyOn($state, 'go');
    }

    function prepareController() {
        vm = $controller('InventoryItemDetailsController', {
            inventoryItem: inventoryItem
        });
        vm.$onInit();
    }

});
