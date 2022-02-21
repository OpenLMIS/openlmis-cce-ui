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

describe('openlmis.inventoryItem state', function() {

    var $state, paginationService, facilityInventoryItemFactory, $rootScope, CCE_RIGHTS, state,
        permissionService, cceAlertFactory, InventoryItemDataBuilder, inventoryItems,
        CCEAlertDataBuilder, alerts, $stateParams;

    beforeEach(function() {
        module('openlmis-main-state');
        module('cce-inventory-list');
        module('cce-alert');

        inject(function($injector) {
            $state = $injector.get('$state');
            $rootScope = $injector.get('$rootScope');
            CCE_RIGHTS = $injector.get('CCE_RIGHTS');
            facilityInventoryItemFactory = $injector.get('facilityInventoryItemFactory');
            paginationService = $injector.get('paginationService');
            permissionService = $injector.get('permissionService');
            cceAlertFactory = $injector.get('cceAlertFactory');
            InventoryItemDataBuilder = $injector.get('InventoryItemDataBuilder');
            CCEAlertDataBuilder = $injector.get('CCEAlertDataBuilder');
        });

        inventoryItems = [
            new InventoryItemDataBuilder().build(),
            new InventoryItemDataBuilder().build(),
            new InventoryItemDataBuilder().build()
        ];

        alerts = [
            new CCEAlertDataBuilder().build(),
            new CCEAlertDataBuilder().build(),
            new CCEAlertDataBuilder().build()
        ];

        spyOn(cceAlertFactory, 'getAlertsGroupedByDevice').andReturn(alerts);
        spyOn(facilityInventoryItemFactory, 'query').andReturn(inventoryItems);
        spyOn(permissionService, 'hasPermissionWithAnyProgramAndAnyFacility');

        spyOn(paginationService, 'registerUrl').andCallFake(function(stateParams, method) {
            return method(stateParams);
        });

        state = $state.get('openlmis.cce.inventory');

        $stateParams = {
            program: undefined,
            facility: undefined,
            page: 0,
            size: 10
        };
    });

    it('should use cce-inventory-list.html template', function() {
        expect(state.templateUrl).toEqual('cce-inventory-list/cce-inventory-list.html');
    });

    it('should expose controller as vm', function() {
        expect(state.controllerAs).toEqual('vm');
    });

    it('should expose CceInventoryListController', function() {
        expect(state.controller).toEqual('CceInventoryListController');
    });

    it('should fetch a list of CCE alerts', function() {
        var result = state.resolve.cceAlerts(cceAlertFactory, inventoryItems);
        $rootScope.$apply();

        expect(result).toEqual(alerts);
        expect(cceAlertFactory.getAlertsGroupedByDevice).toHaveBeenCalled();
    });

    it('should return undefined if inventory items list is empty', function() {
        var result = state.resolve.cceAlerts(cceAlertFactory, []);
        $rootScope.$apply();

        expect(result).toEqual(undefined);
        expect(cceAlertFactory.getAlertsGroupedByDevice).not.toHaveBeenCalled();
    });

    it('should fetch a list of inventory items', function() {
        $stateParams.program = 'program-id';
        $stateParams.facility = 'facility-id';

        var result = state.resolve.inventoryItems(
            facilityInventoryItemFactory, paginationService, $stateParams
        );
        $rootScope.$apply();

        expect(result).toEqual(inventoryItems);
        expect(facilityInventoryItemFactory.query).toHaveBeenCalled();
    });

    it('should require CCE_INVENTORY_VIEW, CCE_INVENTORY_EDIT and CCE_INVENTORY_TRANSFER rights to enter', function() {
        expect(state.accessRights).toEqual([
            CCE_RIGHTS.CCE_INVENTORY_VIEW,
            CCE_RIGHTS.CCE_INVENTORY_EDIT,
            CCE_RIGHTS.CCE_INVENTORY_TRANSFER
        ]);
    });

});
