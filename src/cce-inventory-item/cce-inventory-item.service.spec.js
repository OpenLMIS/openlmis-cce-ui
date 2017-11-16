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

describe('inventoryItemService', function() {

    var $rootScope, $httpBackend;
    var cceUrlFactory, inventoryItemService, InventoryItemDataBuilder;
    var inventoryItems, inventoryItem, ITEM_ID;

    beforeEach(function() {
        module('cce-inventory-item');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            cceUrlFactory = $injector.get('cceUrlFactory');
            inventoryItemService = $injector.get('inventoryItemService');
            InventoryItemDataBuilder = $injector.get('InventoryItemDataBuilder');
        });

        prepareTestData();
    });

    describe('get', function() {

        beforeEach(function() {
            $httpBackend.when('GET', cceUrlFactory('/api/inventoryItems/' + inventoryItems[0].id))
                .respond(200, inventoryItems[0]);
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

            var expected = angular.copy(inventoryItems[0]);
            expected.decommissionDate = new Date('01/01/2017');

            expect(angular.toJson(result)).toEqual(angular.toJson(expected));
        });

        it('should make a proper request', function() {
            $httpBackend.expect('GET', cceUrlFactory('/api/inventoryItems/' + inventoryItems[0].id));

            inventoryItemService.get(inventoryItems[0].id);
            $httpBackend.flush();
        });

        it('should transform decommissionDate', function() {

        });
    });

    describe('getAll', function() {

        var parameters = {
            page: 0,
            size: 10
        };

        beforeEach(function() {
            $httpBackend.when('GET', cceUrlFactory('/api/inventoryItems?page=' + parameters.page +
                '&size=' + parameters.size)).respond(200, {
                content: inventoryItems
            });
        });

        it('should return promise', function() {
            var result = inventoryItemService.getAll(parameters);
            $httpBackend.flush();

            expect(result.then).not.toBeUndefined();
        });

        it('should resolve to inventory items', function() {
            var result;

            inventoryItemService.getAll(parameters).then(function(data) {
                result = data;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            var expected = angular.copy(inventoryItems);
            expected[0].decommissionDate = new Date('01/01/2017');
            expected[1].decommissionDate = new Date('01/01/2017');

            expect(angular.toJson(result)).toEqual(angular.toJson({
                content: expected
            }));
        });

        it('should make a proper request', function() {
            $httpBackend.expect('GET', cceUrlFactory('/api/inventoryItems?page=' + parameters.page +
                '&size=' + parameters.size));

            inventoryItemService.getAll(parameters);
            $httpBackend.flush();
        });
    });

    describe('save', function() {

        var result;

        beforeEach(function() {
            result = undefined;
        });

        it('should create inventory item if ID is not given', function() {
            inventoryItem = new InventoryItemDataBuilder().withId(undefined).build();

            var returned = angular.copy(inventoryItem);

            returned.id = ITEM_ID;

            $httpBackend.expect(
                'POST', cceUrlFactory('/api/inventoryItems'), inventoryItem
            ).respond(200, returned);

            inventoryItemService.save(inventoryItem).then(function(inventoryItem) {
                result = inventoryItem;
            });

            $httpBackend.flush();
            $rootScope.$apply();

            expect(angular.toJson(result)).toEqual(angular.toJson(returned));
        });

        it('should update inventory item if it has ID', function() {
            inventoryItem = new InventoryItemDataBuilder().withId(ITEM_ID).build();

            $httpBackend.expect(
                'PUT', cceUrlFactory('/api/inventoryItems/' + ITEM_ID), inventoryItem
            ).respond(200, inventoryItem);

            inventoryItemService.save(inventoryItem).then(function(inventoryItem) {
                result = inventoryItem;
            });

            $httpBackend.flush();
            $rootScope.$apply();

            expect(angular.toJson(result)).toEqual(angular.toJson(inventoryItem));
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    function prepareTestData() {
        ITEM_ID = 'some-inventory-item-id';

        inventoryItems = [
            new InventoryItemDataBuilder().withId('1').build(),
            new InventoryItemDataBuilder().withId('2').build()
        ];
    }
});
