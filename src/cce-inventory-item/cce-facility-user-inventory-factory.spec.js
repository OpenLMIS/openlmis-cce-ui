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

describe('facilityUserInventoryItemFactory', function() {

    var $q, $rootScope, facilityUserInventoryItemFactory, referencedataUserService, facilityService,
        inventoryItemService, inventoryItem, facility, user,
        facilityDeferred, inventoryItemDeferred, userDeferred, query, FacilityDataBuilder,
        InventoryItemDataBuilder, UserDataBuilder;

    beforeEach(function() {
        module('cce-inventory-item', function($provide) {
            facilityService = jasmine.createSpyObj('facilityService', ['query']);
            $provide.service('facilityService', function() {
                return facilityService;
            });
            referencedataUserService = jasmine.createSpyObj('referencedataUserService', ['query']);
            $provide.service('referencedataUserService', function() {
                return referencedataUserService;
            });
            inventoryItemService = jasmine.createSpyObj('inventoryItemService', ['query']);
            $provide.service('inventoryItemService', function() {
                return inventoryItemService;
            });
        });

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            referencedataUserService = $injector.get('referencedataUserService');
            facilityService = $injector.get('facilityService');
            inventoryItemService = $injector.get('inventoryItemService');
            facilityUserInventoryItemFactory = $injector.get('facilityUserInventoryItemFactory');
            FacilityDataBuilder = $injector.get('FacilityDataBuilder');
            InventoryItemDataBuilder = $injector.get('InventoryItemDataBuilder');
            UserDataBuilder = $injector.get('UserDataBuilder');
        });

        facility = new FacilityDataBuilder().build();
        inventoryItem = new InventoryItemDataBuilder().build();
        user = new UserDataBuilder().build();

        query = {
            page: 1,
            size: 10
        };

        inventoryItemDeferred = $q.defer();
        inventoryItemService.query.andReturn(inventoryItemDeferred.promise);

        facilityDeferred = $q.defer();
        facilityService.query.andReturn(facilityDeferred.promise);

        userDeferred = $q.defer();
        referencedataUserService.query.andReturn(userDeferred.promise);
    });

    describe('query', function() {

        it('should reject promise if inventory items promise is rejected', function() {
            var status = undefined;

            facilityUserInventoryItemFactory.query(query).then(function() {
                status = 'resolved';
            }, function() {
                status = 'rejected';
            });

            inventoryItemDeferred.reject();
            $rootScope.$apply();

            expect(facilityService.query).not.toHaveBeenCalled();
            expect(referencedataUserService.query).not.toHaveBeenCalled();
            expect(inventoryItemService.query).toHaveBeenCalledWith(query);

            expect(status).toEqual('rejected');
        });

        it('should reject promise if facilities and users promises are rejected', function() {
            var status = undefined,
                result = [];

            facilityUserInventoryItemFactory.query(query).then(function(response) {
                status = 'resolved';
                result = response;
            }, function() {
                status = 'rejected';
            });
            inventoryItemDeferred.resolve({content: [inventoryItem]});
            userDeferred.reject();
            facilityDeferred.reject();
            $rootScope.$apply();

            expect(facilityService.query).toHaveBeenCalledWith({id: [facility.id]});
            expect(referencedataUserService.query).toHaveBeenCalledWith({
                id: [user.id],
                page: 0,
                size: 1
            });
            expect(inventoryItemService.query).toHaveBeenCalledWith(query);

            expect(status).toEqual('rejected');
        });

        it('should resolve promise and add facilities and users info if all promises resolved', function() {
            var status = undefined,
                result = [];

            facilityUserInventoryItemFactory.query(query).then(function(response) {
                status = 'resolved';
                result = response;
            }, function() {
                status = 'rejected';
            });
            inventoryItemDeferred.resolve({content: [inventoryItem]});
            userDeferred.resolve({content: [user]});
            facilityDeferred.resolve([facility]);
            $rootScope.$apply();

            expect(facilityService.query).toHaveBeenCalledWith({id: [facility.id]});
            expect(referencedataUserService.query).toHaveBeenCalledWith({
                id: [user.id],
                page: 0,
                size: 1
            });
            expect(inventoryItemService.query).toHaveBeenCalledWith(query);

            expect(status).toEqual('resolved');

            expect(result.content.length).toBe(1);
            result.content.forEach(function (one) {
                expect(one.id).toEqual(inventoryItem.id);
                expect(one.name).toEqual(inventoryItem.name);
                expect(one.facility.id).toBe(inventoryItem.facility.id);
                expect(one.facility.href).toBe(inventoryItem.facility.href);
                expect(one.facility.name).toBe(facility.name);
                expect(one.lastModifier.id).toBe(inventoryItem.lastModifier.id);
                expect(one.lastModifier.href).toBe(inventoryItem.lastModifier.href);
                expect(one.lastModifier.name).toBe(user.name);
            });
        });
    });
});
