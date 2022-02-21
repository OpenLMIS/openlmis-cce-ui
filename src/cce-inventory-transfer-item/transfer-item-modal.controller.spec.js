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

describe('TransferItemModalController', function() {

    var vm, /*messageService, $q,*/ $rootScope, $controller, /*inventoryItemService,*/ inventoryItem,
        /*loadingModalService, notificationService, /*messages, saveDeferred,*/
        $scope, stateTrackerService, FacilityProgramInventoryItemDataBuilder;
        /*accessTokenFactory, $window;*/

    beforeEach(function() {
        module('cce-inventory-transfer-item');

        inject(function($injector) {
            //$q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            // inventoryItemService = $injector.get('inventoryItemService');
            //loadingModalService = $injector.get('loadingModalService');
            //notificationService = $injector.get('notificationService');
            stateTrackerService = $injector.get('stateTrackerService');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
            //accessTokenFactory = $injector.get('accessTokenFactory');
        });

        inventoryItem = new FacilityProgramInventoryItemDataBuilder().build();

        //saveDeferred = $q.defer();
        $scope = {};

        vm = $controller('TransferItemModalController', {
            $scope: $scope,
            inventoryItem: inventoryItem,
            canTransfer: true
        });

        spyOn(stateTrackerService, 'goToPreviousState');
        /*spyOn(messageService, 'get').andCallFake(function(key) {
            return messages[key];
        });
        spyOn(inventoryItemService, 'save').andReturn(saveDeferred.promise);*/

        /*spyOn($window, 'open').andCallThrough();
        spyOn(accessTokenFactory, 'addAccessToken').andCallThrough();*/
    });

    describe('$onInit', function() {

        it('should copy item', function() {
            vm.$onInit();

            expect(vm.inventoryItem).not.toBe(inventoryItem);
            expect(vm.inventoryItem).toEqual(inventoryItem);
        });

        it('should pre-set new facility', function() {
            vm.$onInit();

            expect(vm.newFacility).toEqual(inventoryItem.facility);
        });

        it('should pre-set new program', function() {
            vm.$onInit();

            expect(vm.newProgram).toEqual(inventoryItem.program);
        });

        it('should pre-set new year of installation', function() {
            vm.$onInit();

            expect(vm.newYearOfInstallation).toEqual(inventoryItem.yearOfInstallation);
        });

        it('should set userHasRightToTRANSFER as true if user has CCE_INVENTORY_TRANSFER right', function() {
            vm.$onInit();

            expect(vm.userHasRightToTransfer).toBe(true);
        });

        it('should set userHasRightToTransfer as false if user has no CCE_INVENTORY_TRANSFER right', function() {
            vm = $controller('TransferItemModalController', {
                inventoryItem: inventoryItem,
                $scope: $scope,
                canTransfer: false
            });

            vm.$onInit();

            expect(vm.userHasRightToTransfer).toBe(false);
        });

    });

    describe('cancel', function() {

        var $q, confirmService, confirmDeferred;

        beforeEach(function() {
            inject(function($injector) {
                $q = $injector.get('$q');
                confirmService = $injector.get('confirmService');
            });

            $scope.transferItemForm = {
                $dirty: false
            };

            confirmDeferred = $q.defer();
            spyOn(confirmService, 'confirm').andReturn(confirmDeferred.promise);

            vm.$onInit();
        });

        it('should take user to the previous state if form is not dirty', function() {
            vm.cancel();

            expect(stateTrackerService.goToPreviousState).toHaveBeenCalledWith(
                'openlmis.cce.inventory', {
                    inventoryItem: inventoryItem,
                    inventoryItemId: inventoryItem.id
                }
            );
        });

        it('should take user back if form is dirty and confirmation succeeded', function() {
            $scope.transferItemForm.$dirty = true;

            vm.cancel();

            expect(confirmService.confirm).toHaveBeenCalled();
            expect(stateTrackerService.goToPreviousState).not.toHaveBeenCalled();

            confirmDeferred.resolve();
            $rootScope.$apply();

            expect(stateTrackerService.goToPreviousState).toHaveBeenCalledWith(
                'openlmis.cce.inventory', {
                    inventoryItem: inventoryItem,
                    inventoryItemId: inventoryItem.id
                }
            );
        });

        it('should not take use back if form is dirty and confirmation failed', function() {
            $scope.transferItemForm.$dirty = true;

            vm.cancel();

            expect(confirmService.confirm).toHaveBeenCalled();

            confirmDeferred.reject();
            $rootScope.$apply();

            expect(stateTrackerService.goToPreviousState).not.toHaveBeenCalled();
        });

    });
});
