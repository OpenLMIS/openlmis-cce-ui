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

    var $q, $rootScope, inventoryItemFactory, programService, facilityService, inventoryItemService,
        inventoryItem, program, facility, inventoryItemResolve, programDeferred, facilityDeferred,
        facilitiesResolve, ProgramDataBuilder, FacilityDataBuilder, InventoryItemDataBuilder;

    beforeEach(function() {
        module('cce-inventory-item', function($provide) {
            programService = jasmine.createSpyObj('programService', ['get']);
            facilityService = jasmine.createSpyObj('facilityService', ['get']);
            $provide.service('programService', function() {
                return programService;
            });
            $provide.service('facilityService', function() {
                return facilityService;
            });

            inventoryItemService = jasmine.createSpyObj('inventoryItemService', ['get']);
            $provide.service('inventoryItemService', function() {
                return inventoryItemService;
            });
        });

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            programService = $injector.get('programService');
            facilityService = $injector.get('facilityService');
            inventoryItemService = $injector.get('inventoryItemService');
            inventoryItemFactory = $injector.get('inventoryItemFactory');
            ProgramDataBuilder = $injector.get('ProgramDataBuilder');
            FacilityDataBuilder = $injector.get('FacilityDataBuilder');
            InventoryItemDataBuilder = $injector.get('InventoryItemDataBuilder');
        });

        program = new ProgramDataBuilder().build();
        facility = new FacilityDataBuilder().build();
        inventoryItem = new InventoryItemDataBuilder().build();

        inventoryItemResolve = true;
        facilitiesResolve = true;

        programDeferred = $q.defer();
        programService.get.andReturn(programDeferred.promise);

        facilityDeferred = $q.defer();
        facilityService.get.andReturn(facilityDeferred.promise);

        inventoryItemService.get.andCallFake(function() {
            var inventoryItemDeferred = $q.defer();

            if (inventoryItemResolve) {
                inventoryItemDeferred.resolve(inventoryItem);
            } else {
                inventoryItemDeferred.reject();
            }

            return inventoryItemDeferred.promise;
        });
    });

    describe('get', function() {

        it('should reject promise if inventory item is not found', function() {
            var status;

            inventoryItemResolve = false;

            inventoryItemFactory.get(inventoryItem.id).then(function() {
                status = 'resolved';
            }, function() {
                status = 'rejected';
            });

            $rootScope.$apply();

            expect(programService.get).not.toHaveBeenCalled();
            expect(inventoryItemService.get).toHaveBeenCalledWith(inventoryItem.id);

            expect(status).toEqual('rejected');
        });

        it('should resolve promise if program and facility is not found', function() {
            var status,
                result;

            inventoryItemFactory.get(inventoryItem.id).then(function(response) {
                status = 'resolved';
                result = response;
            }, function() {
                status = 'rejected';
            });

            programDeferred.reject();
            facilityDeferred.reject();
            $rootScope.$apply();

            expect(programService.get).toHaveBeenCalledWith(inventoryItem.program.id);
            expect(facilityService.get).toHaveBeenCalledWith(inventoryItem.facility.id);
            expect(inventoryItemService.get).toHaveBeenCalledWith(inventoryItem.id);

            expect(status).toEqual('resolved');
            expect(result).toEqual(inventoryItem);
            expect(result.program.name).toBe(undefined);
            expect(result.facility.name).toBe(undefined);
        });

        it('should resolve promise and add program and facility info if have been found', function() {
            var status,
                result;

            inventoryItemFactory.get(inventoryItem.id).then(function(response) {
                status = 'resolved';
                result = response;
            }, function() {
                status = 'rejected';
            });

            programDeferred.resolve(program);
            facilityDeferred.resolve(facility);
            $rootScope.$apply();

            expect(programService.get).toHaveBeenCalledWith(inventoryItem.program.id);
            expect(facilityService.get).toHaveBeenCalledWith(inventoryItem.facility.id);
            expect(inventoryItemService.get).toHaveBeenCalledWith(inventoryItem.id);

            expect(status).toEqual('resolved');
            expect(result.id).toEqual(inventoryItem.id);
            expect(result.name).toEqual(inventoryItem.name);
            expect(result.program).toEqual(program);
            expect(result.facility).toEqual(facility);
        });
    });

});
