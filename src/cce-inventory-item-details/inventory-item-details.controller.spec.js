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
        REMOTE_TEMPERATURE_MONITOR_TYPE, $controller, $state, FacilityProgramInventoryItemDataBuilder;

    beforeEach(function() {
        module('cce-inventory-item-details');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            CCE_STATUS = $injector.get('CCE_STATUS');
            MANUAL_TEMPERATURE_GAUGE_TYPE = $injector.get('MANUAL_TEMPERATURE_GAUGE_TYPE');
            REMOTE_TEMPERATURE_MONITOR_TYPE = $injector.get('REMOTE_TEMPERATURE_MONITOR_TYPE');
            UTILIZATION_STATUS = $injector.get('UTILIZATION_STATUS');
            $state = $injector.get('$state');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
        });

        inventoryItem = new FacilityProgramInventoryItemDataBuilder().build();
        spyOn($state, 'go');

        vm = $controller('InventoryItemDetailsController', {
            inventoryItem: inventoryItem,
            canEdit: true
        });
    });

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

        it('should display edit button if user has CCE_INVENTORY_EDIT right', function() {
            vm.$onInit();

            expect(vm.userHasRightToEdit).toBe(true);
        });

        it('should hide edit button if user does not have CCE_INVENTORY_EDIT right', function() {
            vm = $controller('InventoryItemDetailsController', {
                inventoryItem: inventoryItem,
                canEdit: false
            });

            vm.$onInit();

            expect(vm.userHasRightToEdit).toBe(false);
        });

    });

    describe('goToStatusUpdate', function() {

        it('should take user to the status update page', function() {
            vm.goToStatusUpdate(inventoryItem);

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.item.statusUpdate', {
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
            vm.inventoryItem = new FacilityProgramInventoryItemDataBuilder()
                .withFunctionalStatus('FUNCTIONING')
                .build();

            expect(vm.getFunctionalStatusClass()).toEqual('is-functioning');
        });

        it('should return is-awaiting-repair for AWAITING_REPAIR', function() {
            vm.inventoryItem = new FacilityProgramInventoryItemDataBuilder()
                .withFunctionalStatus('AWAITING_REPAIR')
                .build();

            expect(vm.getFunctionalStatusClass()).toEqual('is-awaiting-repair');
        });

        it('should return is-unserviceable for UNSERVICEABLE', function() {
            vm.inventoryItem = new FacilityProgramInventoryItemDataBuilder()
                .withFunctionalStatus('UNSERVICEABLE')
                .build();

            expect(vm.getFunctionalStatusClass()).toEqual('is-unserviceable');
        });

    });

    describe('getFunctionalStatusLabel', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return the value of cceInventoryItemStatus.functioning for FUNCTIONING', function() {
            vm.inventoryItem = new FacilityProgramInventoryItemDataBuilder()
                .withFunctionalStatus('FUNCTIONING')
                .build();

            expect(vm.getFunctionalStatusLabel()).toEqual('cceInventoryItemStatus.functioning');
        });

        it('should return the value of cceInventoryItemStatus.awaitingRepair for AWAITING_REPAIR', function() {
            vm.inventoryItem = new FacilityProgramInventoryItemDataBuilder()
                .withFunctionalStatus('AWAITING_REPAIR')
                .build();

            expect(vm.getFunctionalStatusLabel()).toEqual('cceInventoryItemStatus.awaitingRepair');
        });

        it('should return the value of cceInventoryItemStatus.unserviceable for UNSERVICEABLE', function() {
            vm.inventoryItem = new FacilityProgramInventoryItemDataBuilder()
                .withFunctionalStatus('UNSERVICEABLE')
                .build();

            expect(vm.getFunctionalStatusLabel()).toEqual('cceInventoryItemStatus.unserviceable');
        });

    });

});
