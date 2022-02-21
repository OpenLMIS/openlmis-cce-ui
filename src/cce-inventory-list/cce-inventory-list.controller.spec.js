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

describe('CceInventoryListController', function() {

    var $controller, $state, FUNCTIONAL_STATUS, vm, inventoryItems, stateParams,
        FacilityProgramInventoryItemDataBuilder, FacilityDataBuilder, ProgramDataBuilder,
        cceAlerts, label, REASON_FOR_NOT_WORKING;

    beforeEach(function() {
        module('cce-inventory-list');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            $state = $injector.get('$state');
            FUNCTIONAL_STATUS = $injector.get('FUNCTIONAL_STATUS');
            REASON_FOR_NOT_WORKING = $injector.get('REASON_FOR_NOT_WORKING');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
            FacilityDataBuilder = $injector.get('FacilityDataBuilder');
            ProgramDataBuilder = $injector.get('ProgramDataBuilder');
        });

        inventoryItems = [
            new FacilityProgramInventoryItemDataBuilder()
                .withId('1')
                .build(),
            new FacilityProgramInventoryItemDataBuilder()
                .withId('2')
                .build()
        ];

        stateParams = {
            page: 0,
            size: 10
        };

        cceAlerts = {
            'device-1': {
                activeAlerts: []
            }
        };

        vm = $controller('CceInventoryListController', {
            inventoryItems: inventoryItems,
            cceAlerts: cceAlerts,
            $stateParams: stateParams,
            canEdit: false,
            canTransfer: false
        });

        vm.facility = new FacilityDataBuilder().build();
        vm.program = new ProgramDataBuilder().build();
        vm.isSupervised = false;

        stateParams.facilityId = vm.facility.id;
        stateParams.programId = vm.program.id;

        spyOn($state, 'go').andReturn();
    });

    describe('init', function() {

        it('should expose inventory items', function() {
            vm.$onInit();

            expect(vm.inventoryItems).toEqual(inventoryItems);
        });

        it('should expose alerts', function() {
            vm.$onInit();

            expect(vm.cceAlerts).toEqual(cceAlerts);
        });

        it('should expose the list of functional statuses', function() {
            vm.$onInit();

            expect(vm.functionalStatuses).toEqual(FUNCTIONAL_STATUS.getStatuses());
        });

        it('should set functional status if it was given through state params', function() {
            stateParams.functionalStatus = FUNCTIONAL_STATUS.NON_FUNCTIONING;

            vm.$onInit();

            expect(vm.functionalStatus).toEqual(FUNCTIONAL_STATUS.NON_FUNCTIONING);
        });
    });

    describe('goToStatusUpdate', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should pass the inventory item', function() {
            vm.goToStatusUpdate(inventoryItems[0]);

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.item.statusUpdate', {
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
            vm.functionalStatus = FUNCTIONAL_STATUS.FUNCTIONING;

            vm.search();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory', {
                page: stateParams.page,
                size: stateParams.size,
                facility: vm.facility.id,
                program: vm.program.id,
                functionalStatus: FUNCTIONAL_STATUS.FUNCTIONING,
                supervised: vm.isSupervised
            }, {
                reload: true
            });
        });

        it('should call state go method without parameters', function() {
            vm.functionalStatus = undefined;

            vm.search();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory', {
                page: stateParams.page,
                size: stateParams.size,
                facility: vm.facility.id,
                program: vm.program.id,
                supervised: vm.isSupervised
            }, {
                reload: true
            });
        });
    });

    describe('getReasonLabel', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return empty string if reason is undefined', function() {
            label = vm.getReasonLabel(undefined);

            expect(label).toBe('');
        });

        it('should return empty string if reason is null', function() {
            label = vm.getReasonLabel(null);

            expect(label).toBe('');
        });

        it('should throw exception if reason is invalid', function() {
            expect(function() {
                vm.getReasonLabel('SOME_INVALID_REASON');
            }).toThrow('Invalid reason');
        });

        it('should return localized label', function() {
            label = vm.getReasonLabel(REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS);

            expect(label).toEqual('cceInventoryItemStatus.needsSpareParts');
        });

    });
});
