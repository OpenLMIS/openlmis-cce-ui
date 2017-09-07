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

describe('StatusUpdateButtonController', function() {

    var vm, FUNCTIONAL_STATUS, $rootScope, $scope, $controller, $state, inventoryItem;

    beforeEach(prepareSuite);

    describe('$onInit', function() {

        it('should expose inventoryItem', function() {
            expect(vm.inventoryItem).toEqual(inventoryItem);
        });

        it('should expose getStatusLabel method', function() {
            expect(vm.getStatusLabel).toEqual(FUNCTIONAL_STATUS.getLabel);
        });

        it('should expose getClass method', function() {
            expect(vm.getStatusClass).toEqual(FUNCTIONAL_STATUS.getClass);
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

    function prepareSuite() {
        module('cce-status-update-button');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            FUNCTIONAL_STATUS = $injector.get('FUNCTIONAL_STATUS');
            $state = $injector.get('$state');
        });

        inventoryItem = {
            id: 'fb1a59b4-8388-4b6a-8bc1-40f50ccf8992',
            functionalStatus: FUNCTIONAL_STATUS.FUNCTIONING
        };

        $scope = $rootScope.$new();
        $scope.inventoryItem = inventoryItem;

        vm = $controller('StatusUpdateButtonController', {
            $scope: $scope
        });

        spyOn($state, 'go');

        vm.$onInit();
    }

});
