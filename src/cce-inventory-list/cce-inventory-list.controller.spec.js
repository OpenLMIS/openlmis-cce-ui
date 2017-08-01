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

    var $controller, FUNCTIONAL_STATUS,
        vm, inventoryItems;

    beforeEach(function() {
        module('cce-inventory-list');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            FUNCTIONAL_STATUS = $injector.get('FUNCTIONAL_STATUS');
        });

        inventoryItems = [
            {
                id: 'item-id-1',
                name: 'item-1'
            },
            {
                id: 'item-id-2',
                name: 'item-2'
            }
        ];

        vm = $controller('CceInventoryListController', {
            inventoryItems: inventoryItems
        });
        vm.$onInit();
    });

    describe('init', function() {

        it('should expose inventory items', function() {
            expect(vm.inventoryItems).toEqual(inventoryItems);
        });

        it('should expose getFunctionalStatusClass method', function() {
            expect(angular.isFunction(vm.getFunctionalStatusClass)).toBe(true);
        });
    });

    describe('getFunctionalStatusClass', function() {

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
});
