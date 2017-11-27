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

describe('facilityFactory', function() {

    var $rootScope, $q, permissionService, facilityService, authorizationService, facilityFactory, CCE_RIGHTS, MinimalFacilityDataBuilder, PermissionDataBuilder,
        minimalFacilities, permissions;

    beforeEach(function() {
        module('cce-inventory-list');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            permissionService = $injector.get('permissionService');
            facilityService = $injector.get('facilityService');
            authorizationService = $injector.get('authorizationService');
            facilityFactory = $injector.get('facilityFactory');
            CCE_RIGHTS = $injector.get('CCE_RIGHTS');

            MinimalFacilityDataBuilder = $injector.get('MinimalFacilityDataBuilder');
            PermissionDataBuilder = $injector.get('PermissionDataBuilder');
        });

        minimalFacilities = [
            new MinimalFacilityDataBuilder().build(),
            new MinimalFacilityDataBuilder().build(),
            new MinimalFacilityDataBuilder().build()
        ];

        permissions = [
            new PermissionDataBuilder().withRight(CCE_RIGHTS.CCE_INVENTORY_VIEW).withFacilityId(minimalFacilities[0].id).build(),
            new PermissionDataBuilder().withRight(CCE_RIGHTS.CCE_INVENTORY_VIEW).withFacilityId(minimalFacilities[1].id).build(),
            new PermissionDataBuilder().withRight(CCE_RIGHTS.CCE_INVENTORY_EDIT).withFacilityId(minimalFacilities[2].id).build()
        ];
    });

    describe('getSupervisedFacilitiesBasedOnRights', function() {

        var userId, requisitionCreateFacilities, requisitionAuthorizeFacilities;

        beforeEach(function() {
            spyOn(authorizationService, 'getUser').andReturn({
                user_id: 'user-id'
            });

            spyOn(permissionService, 'load').andReturn($q.resolve(permissions));

            spyOn(facilityService, 'getAllMinimal').andReturn($q.resolve(minimalFacilities));
        });

        it('should call authorization service get user method', function() {
            facilityFactory.getSupervisedFacilitiesBasedOnRights([CCE_RIGHTS.CCE_INVENTORY_VIEW]);
            expect(authorizationService.getUser).toHaveBeenCalled();
        });

        it('should call permission service load method', function() {
            facilityFactory.getSupervisedFacilitiesBasedOnRights([CCE_RIGHTS.CCE_INVENTORY_VIEW]);
            expect(permissionService.load).toHaveBeenCalledWith('user-id');
        });

        it('should call facility service get all minimal method', function() {
            facilityFactory.getSupervisedFacilitiesBasedOnRights([CCE_RIGHTS.CCE_INVENTORY_VIEW]);
            expect(facilityService.getAllMinimal).toHaveBeenCalled();
        });

        it('should filter facilities', function() {
            var result;

            facilityFactory.getSupervisedFacilitiesBasedOnRights([CCE_RIGHTS.CCE_INVENTORY_VIEW]).then(function(facilities) {
                result = facilities;
            });
            $rootScope.$apply();

            expect(result.length).toBe(2);
            expect(result.indexOf(minimalFacilities[0]) >= 0).toBe(true);
            expect(result.indexOf(minimalFacilities[1]) >= 0).toBe(true);

            facilityFactory.getSupervisedFacilitiesBasedOnRights([CCE_RIGHTS.CCE_INVENTORY_EDIT]).then(function(facilities) {
                result = facilities;
            });
            $rootScope.$apply();

            expect(result.length).toBe(1);
            expect(result.indexOf(minimalFacilities[2]) >= 0).toBe(true);
        });
    });
});
