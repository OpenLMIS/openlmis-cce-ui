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

    var $rootScope, $httpBackend, cceUrlFactory, inventoryItemService, InventoryItemDataBuilder,
        inventoryItems;

    beforeEach(function() {
        module('facility-cce-status');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            cceUrlFactory = $injector.get('cceUrlFactory');
            inventoryItemService = $injector.get('inventoryItemService');
            InventoryItemDataBuilder = $injector.get('InventoryItemDataBuilder');
        });

        prepareTestData();
    });

    describe('getAllForFacility', function() {

        it('should throw exception if no arguments passed', function() {
            expect(function() {
                inventoryItemService.getAllForFacility();
            }).toThrow('Facility id must be defined');
        });

        //eslint-disable-next-line jasmine/missing-expect
        it('should resolve to inventory items', function() {
            //$httpBackend.whenGET(cceUrlFactory('/api/inventoryItems?page=0&facilityId=facility-id'))
            $httpBackend.whenGET(cceUrlFactory('/api/inventoryItems?facilityId=facility-id&page=0&size=10'))
                .respond(200, {
                    content: inventoryItems,
                    last: true
                });

            var result;
            inventoryItemService.getAllForFacility('facility-id').then(function(data) {
                result = data;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            verifyResponse(result);
        });

        it('should resolve with empty list if content is empty', function() {
            //$httpBackend.whenGET(cceUrlFactory('/api/inventoryItems?page=0&facilityId=facility-id'))
            $httpBackend.whenGET(cceUrlFactory('/api/inventoryItems?facilityId=facility-id&page=0&size=10'))
                .respond(200, {
                    content: [],
                    last: true
                });

            var result;
            inventoryItemService.getAllForFacility('facility-id').then(function(data) {
                result = data;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            expect(result).toEqual([]);
        });

        it('should reject promise if server return an error', function() {
            //$httpBackend.whenGET(cceUrlFactory('/api/inventoryItems?page=0&facilityId=facility-id'))
            $httpBackend.whenGET(cceUrlFactory('/api/inventoryItems?facilityId=facility-id&page=0&size=10'))
                .respond(400);

            var result = false;
            inventoryItemService.getAllForFacility('facility-id').catch(function() {
                result = true;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            expect(result).toBe(true);
        });

        it('should make proper requests and concat response', function() {
            //$httpBackend.expectGET(cceUrlFactory('/api/inventoryItems?page=1&facilityId=facility-id'))
            $httpBackend.expectGET(cceUrlFactory('/api/inventoryItems?facilityId=facility-id&page=1&size=10'))
                .respond(200, {
                    content: [inventoryItems[0]],
                    last: false
                });

            //$httpBackend.expectGET(cceUrlFactory('/api/inventoryItems?page=2&facilityId=facility-id'))
            $httpBackend.expectGET(cceUrlFactory('/api/inventoryItems?facilityId=facility-id&page=2&size=10'))
                .respond(200, {
                    content: [inventoryItems[1]],
                    last: true
                });

            var result;
            inventoryItemService.getAllForFacility('facility-id', 1).then(function(data) {
                result = data;
            });

            $httpBackend.flush();
            $rootScope.$apply();

            verifyResponse(result);
        });

        function verifyResponse(result) {
            expect(result.length).toBe(2);

            var expected = angular.copy(inventoryItems);
            expected[0].decommissionDate = new Date('01/01/2017');
            expected[1].decommissionDate = new Date('01/01/2017');

            expect(result).toEqual(expected);
        }

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    function prepareTestData() {
        inventoryItems = [
            new InventoryItemDataBuilder().withId('1')
                .build(),
            new InventoryItemDataBuilder().withId('2')
                .build()
        ];
    }
});
