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

describe('CceStatusController', function() {

    var vm, $controller, $rootScope, $q, FACILITY_CCE_STATUS, authorizationService, userId,
        permissionService, FacilityDataBuilder, CCE_RIGHTS, inventoryItemService,
        InventoryItemDataBuilder, functioningInventoryItem, notFunctioningInventoryItem,
        cceAlertFactory, cceAlerts, CCEAlertDataBuilder;

    beforeEach(function() {
        module('facility-cce-status');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            FACILITY_CCE_STATUS = $injector.get('FACILITY_CCE_STATUS');
            authorizationService = $injector.get('authorizationService');
            permissionService = $injector.get('permissionService');
            FacilityDataBuilder = $injector.get('FacilityDataBuilder');
            CCE_RIGHTS = $injector.get('CCE_RIGHTS');
            inventoryItemService = $injector.get('inventoryItemService');
            InventoryItemDataBuilder = $injector.get('InventoryItemDataBuilder');
            CCEAlertDataBuilder = $injector.get('CCEAlertDataBuilder');
            cceAlertFactory = $injector.get('cceAlertFactory');
        });

        userId = '123';
        functioningInventoryItem = new InventoryItemDataBuilder().withId('device-1').build();
        notFunctioningInventoryItem = new InventoryItemDataBuilder().withNonFunctioningStatus().build();

        cceAlerts = {
            'device-1': {
                activeAlerts: []
            }
        };

        spyOn(authorizationService, 'getUser').andReturn({user_id: userId});
        spyOn(permissionService, 'hasPermissionWithAnyProgram').andReturn($q.resolve());
        spyOn(inventoryItemService, 'getAllForFacility');
        spyOn(cceAlertFactory, 'getAlertsGroupedByDevice').andReturn($q.resolve(cceAlerts));

        vm = $controller('CceStatusController');
        vm.facility = new FacilityDataBuilder().build();

    });

    describe('onInit', function() {

        describe('should set status and label', function() {

            it('as ALL FUNCTIONING when all CCE inventory items are functional', function() {
                inventoryItemService.getAllForFacility.andReturn($q.resolve([functioningInventoryItem]));

                vm.$onInit();
                $rootScope.$apply();

                expect(vm.statusLabel).toEqual(FACILITY_CCE_STATUS.getLabel('ALL_FUNCTIONING'));
                expect(vm.statusClass).toEqual(FACILITY_CCE_STATUS.getClass('ALL_FUNCTIONING'));
            });

            it('as NOT FULLY FUNCTIONING when at least one CCE inventory item is functioning and at least one CCE inventory item is not functioning', function() {
                inventoryItemService.getAllForFacility.andReturn($q.resolve([functioningInventoryItem, notFunctioningInventoryItem]));

                vm.$onInit();
                $rootScope.$apply();

                expect(vm.statusLabel).toEqual(FACILITY_CCE_STATUS.getLabel('NOT_FULLY_FUNCTIONING'));
                expect(vm.statusClass).toEqual(FACILITY_CCE_STATUS.getClass('NOT_FULLY_FUNCTIONING'));
            });

            it('as NOT FUNCTIONING when no CCE inventory items are functional', function() {
                inventoryItemService.getAllForFacility.andReturn($q.resolve([notFunctioningInventoryItem]));

                vm.$onInit();
                $rootScope.$apply();

                expect(vm.statusLabel).toEqual(FACILITY_CCE_STATUS.getLabel('NOT_FUNCTIONING'));
                expect(vm.statusClass).toEqual(FACILITY_CCE_STATUS.getClass('NOT_FUNCTIONING'));
            });

            it('as NO CCE when there is no CCE inventory items', function() {
                inventoryItemService.getAllForFacility.andReturn($q.resolve([]));

                vm.$onInit();
                $rootScope.$apply();

                expect(vm.statusLabel).toEqual(FACILITY_CCE_STATUS.getLabel('NO_CCE'));
                expect(vm.statusClass).toEqual(FACILITY_CCE_STATUS.getClass('NO_CCE'));
            });

            it('as LOADING when the facility CCE Status component is loading data from the services', function() {
                vm.$onInit();
                //no scope apply on purpose

                expect(vm.statusLabel).toEqual(FACILITY_CCE_STATUS.getLabel('LOADING'));
                expect(vm.statusClass).toEqual(FACILITY_CCE_STATUS.getClass('LOADING'));
            });

            it('as UNKNOWN the current user doesn\'t have permission to view CCE status for the specific facility', function() {
                permissionService.hasPermissionWithAnyProgram.andReturn($q.reject());

                vm.$onInit();
                $rootScope.$apply();

                var permission = {
                    facilityId: vm.facility.id,
                    right: CCE_RIGHTS.CCE_INVENTORY_VIEW
                };
                expect(permissionService.hasPermissionWithAnyProgram).toHaveBeenCalledWith(userId, permission);
                expect(vm.statusLabel).toEqual(FACILITY_CCE_STATUS.getLabel('UNKNOWN'));
                expect(vm.statusClass).toEqual(FACILITY_CCE_STATUS.getClass('UNKNOWN'));
            });

            it('as UNKNOWN when the Facility CCE Status component failed to load information from the CCE services', function() {
                inventoryItemService.getAllForFacility.andReturn($q.reject());

                vm.$onInit();
                $rootScope.$apply();

                expect(inventoryItemService.getAllForFacility).toHaveBeenCalledWith(vm.facility.id);
                expect(vm.statusLabel).toEqual(FACILITY_CCE_STATUS.getLabel('UNKNOWN'));
                expect(vm.statusClass).toEqual(FACILITY_CCE_STATUS.getClass('UNKNOWN'));
            });

        });

        it('should set inventory items from service', function() {
            inventoryItemService.getAllForFacility.andReturn($q.resolve([functioningInventoryItem]));

            vm.$onInit();
            $rootScope.$apply();

            expect(vm.inventoryItems).toEqual([functioningInventoryItem]);

        });

        it('should set CCE alerts from factory', function() {
            inventoryItemService.getAllForFacility.andReturn($q.resolve([functioningInventoryItem]));

            vm.$onInit();
            $rootScope.$apply();

            expect(cceAlertFactory.getAlertsGroupedByDevice).toHaveBeenCalledWith({deviceId: [functioningInventoryItem.id]});
            expect(vm.cceAlerts).toEqual(cceAlerts);
        });

        it('should set cceAvailable flag as true when there are inventory items', function () {
            inventoryItemService.getAllForFacility.andReturn($q.resolve([functioningInventoryItem]));

            vm.$onInit();
            $rootScope.$apply();

            expect(vm.cceAvailable).toBe(true);
        });

        it('should set cceAvailable flag as false when there are no inventory items', function () {
            inventoryItemService.getAllForFacility.andReturn($q.resolve([]));

            vm.$onInit();
            $rootScope.$apply();

            expect(vm.cceAvailable).toBe(false);
        });

        describe('should set alert status class', function() {

            beforeEach(function() {
                inventoryItemService.getAllForFacility.andReturn($q.resolve([functioningInventoryItem]));
            });

            it('as RTM alert status unavailable when CCE alerts has no device id entries', function() {
                cceAlerts = {};
                cceAlertFactory.getAlertsGroupedByDevice.andReturn($q.resolve(cceAlerts));

                vm.$onInit();
                $rootScope.$apply();

                expect(vm.alertStatusClass).toEqual('rtm-alert-status-unavailable');
            });

            it('as RTM alert status inactive when CCE alerts has device id entries, but no active alerts for them', function() {
                vm.$onInit();
                $rootScope.$apply();

                expect(vm.alertStatusClass).toEqual('rtm-alert-status-inactive');
            });

            it('as RTM alert status active when CCE alerts has device id entries and any active alerts for them', function() {
                var cceAlert = new CCEAlertDataBuilder()
                    .withDeviceId('device-1')
                    .withEndTs(null)
                    .withDismissed(false)
                    .build();
                cceAlerts = {
                    'device-1': {
                        activeAlerts: [cceAlert]
                    }
                };
                cceAlertFactory.getAlertsGroupedByDevice.andReturn($q.resolve(cceAlerts));

                vm.$onInit();
                $rootScope.$apply();

                expect(vm.alertStatusClass).toEqual('rtm-alert-status-active');
            });
        });

        it('should not set RTM alert status when no Inventory items', function() {
            inventoryItemService.getAllForFacility.andReturn($q.resolve([]));

            vm.$onInit();
            $rootScope.$apply();

            expect(vm.alertStatusClass).toBe(undefined);
        });


    });

});
