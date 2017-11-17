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

describe('EditInventoryItemController', function() {

    var vm, $controller, CCE_STATUS, MANUAL_TEMPERATURE_GAUGE_TYPE, ENERGY_SOURCE, inventoryItem,
        UTILIZATION_STATUS, REMOTE_TEMPERATURE_MONITOR_TYPE, $rootScope, $scope, $state, $q,
        saveDeferred, inventoryItemService, loadingModalService, FacilityProgramInventoryItemDataBuilder,
        CatalogItemDataBuilder;

    beforeEach(function() {
        module('cce-edit-inventory-item');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            CCE_STATUS = $injector.get('CCE_STATUS');
            MANUAL_TEMPERATURE_GAUGE_TYPE = $injector.get('MANUAL_TEMPERATURE_GAUGE_TYPE');
            REMOTE_TEMPERATURE_MONITOR_TYPE = $injector.get('REMOTE_TEMPERATURE_MONITOR_TYPE');
            UTILIZATION_STATUS = $injector.get('UTILIZATION_STATUS');
            ENERGY_SOURCE = $injector.get('ENERGY_SOURCE');
            $rootScope = $injector.get('$rootScope');
            $state = $injector.get('$state');
            inventoryItemService = $injector.get('inventoryItemService');
            $q = $injector.get('$q');
            loadingModalService = $injector.get('loadingModalService');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
            CatalogItemDataBuilder = $injector.get('CatalogItemDataBuilder');
        });

        inventoryItem = new FacilityProgramInventoryItemDataBuilder().build();

        $scope = $rootScope.$new();
        saveDeferred = $q.defer();

        spyOn($state, 'go').andReturn();
        spyOn(inventoryItemService, 'save').andReturn(saveDeferred.promise);
        spyOn(loadingModalService, 'open');
        spyOn(loadingModalService, 'close');

        vm = $controller('EditInventoryItemController', {
            $scope: $scope,
            inventoryItem: inventoryItem
        });
    });

    describe('$onInit', function() {

        it('should expose inventory item', function() {
            vm.$onInit();

            expect(vm.inventoryItem).toEqual(inventoryItem);
        });

        it('should expose getStatusLabel', function() {
            vm.$onInit();

            expect(vm.getStatusLabel).toBe(CCE_STATUS.getLabel);
        });

        it('should expose the list available voltage stabilizer statuses', function() {
            vm.$onInit();

            expect(vm.cceStatuses).toEqual(CCE_STATUS.getStatuses());
        });

        it('should expose getManualTemperatureGaugeTypeLabel', function() {
            vm.$onInit();

            expect(vm.getManualTemperatureGaugeTypeLabel).toBe(MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel);
        });

        it('should expose the list available manual temperature gauge types', function() {
            vm.$onInit();

            expect(vm.manualTemperatureGaugeTypes).toEqual(MANUAL_TEMPERATURE_GAUGE_TYPE.getTypes());
        });

        it('should expose getUtilizationStatusLabel', function() {
            vm.$onInit();

            expect(vm.getUtilizationStatusLabel).toBe(UTILIZATION_STATUS.getLabel);
        });

        it('should expose the list available utilization statuses', function() {
            vm.$onInit();

            expect(vm.utilizationStatuses).toEqual(UTILIZATION_STATUS.getStatuses());
        });

        it('should expose getRemoteTemperatureMonitorTypeLabel', function() {
            vm.$onInit();

            expect(
                vm.getRemoteTemperatureMonitorTypeLabel
            ).toBe(
                REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel
            );
        });

        it('should expose the list available remote temperature monitor types', function() {
            vm.$onInit();

            expect(
                vm.remoteTemperatureMonitorTypes
            ).toEqual(
                REMOTE_TEMPERATURE_MONITOR_TYPE.getTypes()
            );
        });

        it('should set powerFieldsDisabled to false if ENERGY_SOURCE is ELECTRIC', function() {
            vm.$onInit();

            expect(vm.powerFieldsDisabled).toBe(false);
        });

        it('should set powerFieldsDisabled to false if ENERGY_SOURCE is GASOLINE', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.GASOLINE;

            vm.$onInit();

            expect(vm.powerFieldsDisabled).toBe(false);
        });

        it('should set powerFieldsDisabled to true if ENERGY_SOURCE is SOLAR', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.SOLAR;

            vm.$onInit();

            expect(vm.powerFieldsDisabled).toBe(true);
        });

        it('should set powerFieldsDisabled to true if ENERGY_SOURCE is NOT_APPLICABLE', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.NOT_APPLICABLE;

            vm.$onInit();

            expect(vm.powerFieldsDisabled).toBe(true);
        });

    });

    describe('add', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should redirect to status update page if inventory item has no ID', function() {
            vm.inventoryItem = new FacilityProgramInventoryItemDataBuilder().withoutId().build();

            vm.add();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.statusUpdate', {
                inventoryItem: vm.inventoryItem
            });
        });

        it('should save inventory item if it has ID', function() {
            vm.add();

            expect(inventoryItemService.save).toHaveBeenCalledWith(inventoryItem);
        });

        it('should open loading modal if inventory item has ID', function() {
            vm.add();

            expect(loadingModalService.open).toHaveBeenCalled();
        });

        it('should redirect to details page if inventory item has ID', function() {
            vm.add();

            saveDeferred.resolve(inventoryItem);
            $rootScope.$apply();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.details', {
                inventoryItem: vm.inventoryItem,
                inventoryItemId: vm.inventoryItem.id
            }, {
                reload: true
            });
        });

        it('should not close loading modal after redirect was called', function() {
            vm.add();

            saveDeferred.resolve(inventoryItem);
            $rootScope.$apply();

            expect(loadingModalService.close).not.toHaveBeenCalled();
        });

        it('should close loading modal after save failed', function() {
            vm.add();

            saveDeferred.reject();
            $rootScope.$apply();

            expect(loadingModalService.close).toHaveBeenCalled();
        });

    });

    describe('cancel', function() {

        var $q, confirmService, confirmDeferred;

        beforeEach(function() {
            inject(function($injector) {
                $q = $injector.get('$q');
                confirmService = $injector.get('confirmService');
            });

            $scope.editInventoryItemForm = {
                $dirty: false
            };

            confirmDeferred = $q.defer();
            spyOn(confirmService, 'confirm').andReturn(confirmDeferred.promise);

            vm.$onInit();
        });

        it('should take user to the inventory item list page if form is not dirty and inventory item has no ID', function() {
            inventoryItem.id = undefined;

            vm.cancel();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory');
        });

        it('should take user to the details page if form is not dirty and inventory item has ID', function() {
            vm.cancel();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.details', {
                inventoryItem: inventoryItem,
                inventoryItemId: inventoryItem.id
            });
        });

        it('should take user back if form is dirty and confirmation succeeded', function() {
            $scope.editInventoryItemForm.$dirty = true;
            inventoryItem.id = undefined;

            vm.cancel();

            expect(confirmService.confirm).toHaveBeenCalled();
            expect($state.go).not.toHaveBeenCalled();

            confirmDeferred.resolve();
            $rootScope.$apply();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory');
        });

        it('should not take use back if form is dirty and confirmation failed', function() {
            $scope.editInventoryItemForm.$dirty = true;

            vm.cancel();

            expect(confirmService.confirm).toHaveBeenCalled();
            expect($state.go).not.toHaveBeenCalled();

            confirmDeferred.reject();
            $rootScope.$apply();

            expect($state.go).not.toHaveBeenCalled();
        });

    });

});
