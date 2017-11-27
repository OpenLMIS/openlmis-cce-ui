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
        FacilityProgramInventoryItemDataBuilder, FacilityDataBuilder;

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

        vm = $controller('CceInventoryListController', {
            inventoryItems: inventoryItems,
            supervisedFacilities: supervisedFacilities,
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

        it('should call state go method with facilityId parameter', function() {
            vm.facilityId = 'facility-id';

            vm.search();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory', {
                page: stateParams.page,
                size: stateParams.size,
                facilityId: 'facility-id'
            }, {reload: true});
        });

        it('should call state go method without facilityId parameter', function() {
            vm.facilityId = undefined;

            vm.search();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory', {
                page: stateParams.page,
                size: stateParams.size
            }, {reload: true});
        });
    });
});
