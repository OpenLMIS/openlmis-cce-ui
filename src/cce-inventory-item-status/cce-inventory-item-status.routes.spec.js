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

describe('openlmis.cce.inventory.statusUpdate state', function() {

    var $q, $state, $rootScope, openlmisModalService, inventoryItemService, state, $stateParams,
        dialogSpy, FacilityProgramInventoryItemDataBuilder;

    beforeEach(function() {
        loadModules();
        injectServices();
        prepareTestData();
        prepareSpies();
    });

    it('should accept inventoryItemId', function() {
        expect(state.url.indexOf(':inventoryItemId') > -1).toBe(true);
        expect(state.params.hasOwnProperty('inventoryItemId')).toBe(true);
    });

    describe('modal', function() {

        var modal,
            canEdit = true;

        beforeEach(function() {
            state.onEnter(openlmisModalService, inventoryItem, canEdit);
            modal = openlmisModalService.createDialog.calls[0].args[0];
        });

        it('should not close backdrop click', function() {
            expect(modal.backdrop).toEqual('static');
        });

        it('should use inventory item from state params if it was given', function() {
            $stateParams.inventoryItem = inventoryItem;

            expect(modal.resolve.inventoryItem()).toEqual(inventoryItem);
        });

        it('should download inventoryItem if ID was given', function() {
            $stateParams.inventoryItemId = 'some-inventory-item-id';

            var result;

            state.resolve.inventoryItem($stateParams, inventoryItemService).then(function(inventoryItem) {
                result = inventoryItem;
            });
            $rootScope.$apply();

            expect(result).toEqual(inventoryItem);
        });

        it('should redirect user to the add page if no ID or item is given', function() {
            state.resolve.inventoryItem($stateParams, inventoryItemService, $state);
            $rootScope.$apply();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.add');
        });

        it('should call permissionService to check if user has CCE_INVENTORY_EDIT right', function() {
            var result;

            state.resolve.canEdit(inventoryItem, authorizationService, permissionService, CCE_RIGHTS).then(function(canEdit) {
                result = canEdit;
            });

            deferred.resolve();
            $rootScope.$apply();

            expect(result).toEqual(true);
            expect(permissionService.hasPermission).toHaveBeenCalled();
            expect(authorizationService.getUser).toHaveBeenCalled();
        });

    });

    describe('onEnter', function() {

        it('should open modal', function() {
            state.onEnter(openlmisModalService, inventoryItemService, $stateParams);
            expect(openlmisModalService.createDialog).toHaveBeenCalled();
        });

        it('should reopen the modal if state was reentered', function() {
            state.onEnter(openlmisModalService, inventoryItemService, $stateParams);
            expect(openlmisModalService.createDialog.calls.length).toBe(1);

            state.onExit();
            state.onEnter(openlmisModalService, inventoryItemService, $stateParams);

            expect(openlmisModalService.createDialog.calls.length).toBe(2);
        });

    });

    describe('onExit', function() {

        it('should close modal', function() {
            state.onEnter(openlmisModalService, inventoryItemService, $stateParams);
            state.onExit();

            expect(dialogSpy.hide).toHaveBeenCalled();
        });

    });

    function loadModules() {
        module('openlmis-main-state');
        module('cce');
        module('cce-inventory-list');
        module('cce-inventory-item-status');
    }

    function injectServices() {
        inject(function($injector) {
            $q = $injector.get('$q');
            $state = $injector.get('$state');
            openlmisModalService = $injector.get('openlmisModalService');
            inventoryItemService = $injector.get('inventoryItemService');
            $rootScope = $injector.get('$rootScope');
            CCE_RIGHTS = $injector.get('CCE_RIGHTS');
            authorizationService = $injector.get('authorizationService');
            permissionService = $injector.get('permissionService');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
        });
    }

    function prepareTestData() {
        state = $state.get('openlmis.cce.inventory.statusUpdate');
        $stateParams = {};
        inventoryItem = new FacilityProgramInventoryItemDataBuilder().build();
        dialogSpy = jasmine.createSpyObj('dialog', ['hide']);
        deferred = $q.defer();
    }

    function prepareSpies() {
        spyOn(authorizationService, 'getUser').andReturn({ user_id: 'user-id' });
        spyOn($state, 'go');
        spyOn(openlmisModalService, 'createDialog').andReturn(dialogSpy);
        spyOn(inventoryItemService, 'get').andReturn($q.when(inventoryItem));
        spyOn(permissionService, 'hasPermission').andReturn(deferred.promise);
    }

});
