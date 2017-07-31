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

/*describe('inventoryItemService', function() {

    var $rootScope, $httpBackend, cceUrlFactory, inventoryItemService, inventoryItems;

    beforeEach(function() {
        module('cce-inventory-item');

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            cceUrlFactory = $injector.get('cceUrlFactory');
            inventoryItemService = $injector.get('inventoryItemService');
        });

        inventoryItems = [
            {
                id: '1'
            },
            {
                id: '2'
            }
        ];
    });

    describe('get', function() {

        beforeEach(function() {
            $httpBackend.when('GET', cceUrlFactory('/api/inventoryItems/' + inventoryItems[0].id)).respond(200, inventoryItems[0]);
        });

        it('should return promise', function() {
            var result = inventoryItemService.get(inventoryItems[0].id);
            $httpBackend.flush();

            expect(result.then).not.toBeUndefined();
        });

        it('should resolve to inventory item', function() {
            var result;

            inventoryItemService.get(inventoryItems[0].id).then(function(data) {
                result = data;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            expect(angular.toJson(result)).toEqual(angular.toJson(inventoryItems[0]));
        });

        it('should make a proper request', function() {
            $httpBackend.expect('GET', cceUrlFactory('/api/inventoryItems/' + inventoryItems[0].id));

            inventoryItemService.get(inventoryItems[0].id);
            $httpBackend.flush();
        });
    });

    describe('getAll', function() {

        beforeEach(function() {
            $httpBackend.when('GET', cceUrlFactory('/api/inventoryItems')).respond(200, inventoryItems);
        });

        it('should return promise', function() {
            var result = inventoryItemService.getAll(inventoryItems[0].id);
            $httpBackend.flush();

            expect(result.then).not.toBeUndefined();
        });

        it('should resolve to inventory items', function() {
            var result;

            inventoryItemService.getAll().then(function(data) {
                result = data;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            expect(angular.toJson(result)).toEqual(angular.toJson(inventoryItems));
        });

        it('should make a proper request', function() {
            $httpBackend.expect('GET', cceUrlFactory('/api/inventoryItems'));

            inventoryItemService.getAll(inventoryItems[0].id);
            $httpBackend.flush();
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });
});
*/
