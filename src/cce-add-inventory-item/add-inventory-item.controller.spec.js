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

describe('AddInventoryItemController', function() {

    var vm, $controller, $state, types, $scope, $rootScope, catalogItem, facility, program,
        CatalogItemDataBuilder, FacilityDataBuilder, ProgramDataBuilder;

    beforeEach(function() {
        module('cce-add-inventory-item');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            $state = $injector.get('$state');
            $rootScope = $injector.get('$rootScope');
            CatalogItemDataBuilder = $injector.get('CatalogItemDataBuilder');
            ProgramDataBuilder = $injector.get('ProgramDataBuilder');
            FacilityDataBuilder = $injector.get('FacilityDataBuilder');
        });

        types = [
            'Refrigerator',
            'Walk-in freezer'
        ];

        catalogItem = new CatalogItemDataBuilder().build();
        program = new ProgramDataBuilder().build();
        facility = new FacilityDataBuilder().build();

        $scope = $rootScope.$new();

        spyOn($state, 'go').andReturn();

        vm = $controller('AddInventoryItemController', {
            $scope: $scope,
            types: types,
            catalogItems: [catalogItem]
        });

        vm.$onInit();
    });

    describe('$onInit', function() {

        it('should expose types', function() {
            expect(vm.types).toEqual(types);
        });

        it('should expose catalog items', function() {
            expect(vm.catalogItems).toEqual([catalogItem]);
        });

    });

    describe('addInventoryItem', function() {

        it('should redirect user to the edit page and pass inventory item', function() {
            vm.facility = facility;
            vm.program = program;
            vm.catalogItem = catalogItem;

            vm.addInventoryItem();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.edit', {
                inventoryItem: {
                    facility: facility,
                    programId: program.id,
                    program: program,
                    catalogItem: catalogItem
                }
            });
        });

    });

    describe('goToInventoryList', function() {

        var $q, confirmService, confirmDeferred;

        beforeEach(function() {
            inject(function($injector) {
                $q = $injector.get('$q');
                confirmService = $injector.get('confirmService');
            });

            $scope.addInventoryItemForm = {
                $dirty: false
            };

            confirmDeferred = $q.defer();
            spyOn(confirmService, 'confirm').andReturn(confirmDeferred.promise);
        });

        it('should take use back if form is not dirty', function() {
            vm.goToInventoryList();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory');
        });

        it('should take user back if form is dirty and confirmation succeeded', function() {
            $scope.addInventoryItemForm.$dirty = true;

            vm.goToInventoryList();

            expect(confirmService.confirm).toHaveBeenCalled();
            expect($state.go).not.toHaveBeenCalled();

            confirmDeferred.resolve();
            $rootScope.$apply();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory');
        });

        it('should not take use back if form is dirty and confirmation failed', function() {
            $scope.addInventoryItemForm.$dirty = true;

            vm.goToInventoryList();

            expect(confirmService.confirm).toHaveBeenCalled();
            expect($state.go).not.toHaveBeenCalled();

            confirmDeferred.reject();
            $rootScope.$apply();

            expect($state.go).not.toHaveBeenCalled();
        });

    });

});
