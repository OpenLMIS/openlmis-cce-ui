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

describe('CceInventoryListController', function () {

    var $controller, $state, FUNCTIONAL_STATUS, vm, inventoryItems, stateParams, authorizationService,
        FacilityProgramInventoryItemDataBuilder, FacilityDataBuilder, cceActiveAlerts;

    beforeEach(function() {
        module('cce-inventory-list');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            $state = $injector.get('$state');
            FUNCTIONAL_STATUS = $injector.get('FUNCTIONAL_STATUS');
            authorizationService = $injector.get('authorizationService');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
            FacilityDataBuilder = $injector.get('FacilityDataBuilder');
        });

        inventoryItems = [
            new FacilityProgramInventoryItemDataBuilder().withId('1').build(),
            new FacilityProgramInventoryItemDataBuilder().withId('2').build()
        ];

        supervisedFacilities = [
            new FacilityDataBuilder().build(),
            new FacilityDataBuilder().build(),
            new FacilityDataBuilder().build()
        ];

        stateParams = {
            page: 0,
            size: 10,
            facilityId: supervisedFacilities[0].id
        };

        cceActiveAlerts = {
            "device-1": [
                {
                    alert_id: "active-alert-1",
                    alert_type: "warning_hot",
                    device_id: "device-1",
                    end_ts: null,
                    start_ts: 1,
                    status: {
                        "en-US": "Equipment needs attention: too hot"
                    }
                }
            ]
        };

        vm = $controller('CceInventoryListController', {
            inventoryItems: inventoryItems,
            supervisedFacilities: supervisedFacilities,
            cceActiveAlerts: cceActiveAlerts,
            $stateParams: stateParams
        });

        spyOn($state, 'go').andReturn();
    });

    describe('init', function() {

        it('should expose inventory items', function() {
            vm.$onInit();

            expect(vm.inventoryItems).toEqual(inventoryItems);
        });

        it('should expose supervised facilities', function() {
            vm.$onInit();
            expect(vm.supervisedFacilities).toEqual(supervisedFacilities);
        });

        it('should expose supervised facilities', function() {
            vm.$onInit();
            expect(vm.facilityId).toEqual(supervisedFacilities[0].id);
        });

        it('should expose active alerts', function() {
            vm.$onInit();
            expect(vm.cceActiveAlerts).toEqual(cceActiveAlerts);
        });

        it('should expose the list of functional statuses', function() {
            vm.$onInit();
            expect(vm.functionalStatuses).toEqual(FUNCTIONAL_STATUS.getStatuses());
        });

        it('should set userHasRightToEdit as true if user has CCE_INVENTORY_EDIT for provided program', function() {
            spyOn(authorizationService, 'hasRight').andReturn(true);
            vm.$onInit();

            expect(vm.userHasRightToEdit).toEqual(true);
        });

        it('should set userHasRightToEdit as false if user has no CCE_INVENTORY_EDIT for provided program', function() {
            spyOn(authorizationService, 'hasRight').andReturn(false);
            vm.$onInit();

            expect(vm.userHasRightToEdit).toEqual(false);
        });

        it('should set functional status if it was given through state params', function() {
            stateParams.functionalStatus = FUNCTIONAL_STATUS.NON_FUNCTIONING;

            vm.$onInit();

            expect(vm.functionalStatus).toEqual(FUNCTIONAL_STATUS.NON_FUNCTIONING);
        });
    });

    describe('getFunctionalStatusClass', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return is-functioning class', function() {
            expect(vm.getFunctionalStatusClass(FUNCTIONAL_STATUS.FUNCTIONING)).toEqual('is-functioning');
        });

        it('should return is-non-functioning class', function() {
            expect(vm.getFunctionalStatusClass(FUNCTIONAL_STATUS.NON_FUNCTIONING)).toEqual('is-non-functioning');
            expect(vm.getFunctionalStatusClass(FUNCTIONAL_STATUS.AWAITING_REPAIR)).toEqual('is-non-functioning');
            expect(vm.getFunctionalStatusClass(FUNCTIONAL_STATUS.UNSERVICABLE)).toEqual('is-non-functioning');
        });

        it('should return is-obsolete class', function() {
            expect(vm.getFunctionalStatusClass(FUNCTIONAL_STATUS.OBSOLETE)).toEqual('is-obsolete');
        });
    });

    describe('getAlertClass', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return active class if device has any active alerts', function() {
            expect(vm.getAlertClass('device-1')).toEqual('active');
        });

        it('should return inactive class if device has no active alerts', function() {
            expect(vm.getAlertClass('no-alerts-device')).toEqual('inactive');
        });
    });

    describe('getAlertPopoverTitle', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return title if device has any active alerts', function() {
            expect(vm.getAlertPopoverTitle('device-1')).not.toEqual('');
        });

        it('should return empty string if device has no active alerts', function() {
            expect(vm.getAlertPopoverTitle('no-alerts-device')).toEqual('');
        });
    });

    describe('getAlertPopoverTemplateUrl', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return template URL if device has any active alerts', function() {
            expect(vm.getAlertPopoverTemplateUrl('device-1')).toEqual('cce-inventory-list/rtm-alerts-popover.html');
        });

        it('should return empty string if device has no active alerts', function() {
            expect(vm.getAlertPopoverTemplateUrl('no-alerts-device')).toEqual('');
        });
    });

    describe('toIsoDate', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return ISO formatted date given epoch in milliseconds', function() {
            expect(vm.toIsoDate(1514793600000)).toEqual('2018-01-01T08:00:00.000Z');
        });
    });

    describe('goToStatusUpdate', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should pass the inventory item', function() {
            vm.goToStatusUpdate(inventoryItems[0]);

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.statusUpdate', {
                inventoryItem: inventoryItems[0],
                inventoryItemId: inventoryItems[0].id
            });
        });
    });

    describe('search', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should call state go method with parameters', function() {
            vm.facilityId = 'facility-id';
            vm.functionalStatus = FUNCTIONAL_STATUS.FUNCTIONING;

            vm.search();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory', {
                page: stateParams.page,
                size: stateParams.size,
                facilityId: 'facility-id',
                functionalStatus: FUNCTIONAL_STATUS.FUNCTIONING
            }, {reload: true});
        });

        it('should call state go method without parameters', function() {
            vm.facilityId = undefined;
            vm.functionalStatus = undefined;

            vm.search();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory', {
                page: stateParams.page,
                size: stateParams.size
            }, {reload: true});
        });
    });
});
