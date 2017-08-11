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
    var cceUrlFactory, inventoryItemService;
    var inventoryItems, inventoryItem, ITEM_ID;

    beforeEach(function() {
        module('cce-inventory-item');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            cceUrlFactory = $injector.get('cceUrlFactory');
            inventoryItemService = $injector.get('inventoryItemService');
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
            expected.decommissionDate = new Date('08/10/2017');

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
            expected[0].decommissionDate = new Date('08/10/2017');
            expected[1].decommissionDate = new Date('08/10/2017');

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
            inventoryItem.id = ITEM_ID;

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
        inventoryItem = {
            'facility': {
                'code': 'HC01',
                'name': 'Comfort Health Clinic',
                'geographicZone': {
                    'code': 'Malawi-Southern',
                    'name': 'Southern Region',
                    'level': {
                        'code': 'Region',
                        'levelNumber': 2,
                        'id': '9b497d87-cdd9-400e-bb04-fae0bf6a9491'
                    },
                    'parent': {
                        'code': 'Malawi',
                        'name': 'Malawi',
                        'level': {
                            'code': 'Country',
                            'levelNumber': 1,
                            'id': '6b78e6c6-292e-4733-bb9c-3d802ad61206'
                        },
                        'id': '4e471242-da63-436c-8157-ade3e615c848'
                    },
                    'id': '0bbd69c1-e20f-48f5-aae4-26dcd8aa7602'
                },
                'type': {
                    'code': 'health_center',
                    'name': 'Health Center',
                    'displayOrder': 2,
                    'active': true,
                    'id': 'ac1d268b-ce10-455f-bf87-9c667da8f060'
                },
                'operator': {
                    'code': 'moh',
                    'name': 'Ministry of Health',
                    'displayOrder': 1,
                    'id': '9456c3e9-c4a6-4a28-9e08-47ceb16a4121'
                },
                'active': true,
                'enabled': true,
                'openLmisAccessible': true,
                'supportedPrograms': [{
                    'id': 'dce17f2e-af3e-40ad-8e00-3496adef44c3',
                    'code': 'PRG001',
                    'name': 'Family Planning',
                    'programActive': true,
                    'periodsSkippable': true,
                    'showNonFullSupplyTab': true,
                    'supportActive': true
                }, {
                    'id': '10845cb9-d365-4aaa-badd-b4fa39c6a26a',
                    'code': 'PRG002',
                    'name': 'Essential Meds',
                    'programActive': true,
                    'periodsSkippable': false,
                    'showNonFullSupplyTab': false,
                    'supportActive': true
                }],
                'id': 'e6799d64-d10d-4011-b8c2-0e4d4a3f65ce'
            },
            'programId': 'dce17f2e-af3e-40ad-8e00-3496adef44c3',
            'catalogItem': {
                'fromPqsCatalog': true,
                'equipmentCode': 'string',
                'type': 'Refrigerator',
                'model': 'X-GGTA 1',
                'manufacturer': 'Cooltec',
                'energySource': 'ELECTRIC',
                'dateOfPrequal': 0,
                'storageTemperature': 'PLUS4',
                'maxOperatingTemp': 0,
                'minOperatingTemp': 0,
                'energyConsumption': 'string',
                'holdoverTime': 0,
                'grossVolume': 0,
                'netVolume': 0,
                'visibleInCatalog': true,
                'archived': false,
                'id': 'cb3c5e06-688b-4568-ab0f-b08332b4a10e'
            },
            'voltageStabilizer': 'NO',
            'voltageRegulator': 'UNKNOWN',
            'serialNumber': 'S0M3-53R14L-NUMB3R',
            'referenceName': 'Refrigerator One',
            'yearOfInstallation': 2000,
            'backupGenerator': 'YES',
            'manualTemperatureGauge': 'PAIRED',
            'functionalStatus': 'OBSOLETE',
            'reasonNotWorkingOrNotInUse': 'NOT_APPLICABLE',
            'decommissionDate': '08/10/2017'
        };

        inventoryItems = [{
            id: '1',
            decommissionDate: '08/10/2017'
        }, {
            id: '2',
            decommissionDate: '08/10/2017'
        }];

        ITEM_ID = 'some-inventory-item-id';
    }
});
