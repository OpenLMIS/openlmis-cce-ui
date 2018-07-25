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

describe('openlmis.cce.inventory.item.statusUpdate state', function() {

    var $q, $state, openlmisModalService, inventoryItemService, state, $stateParams, dialogSpy,
        FacilityProgramInventoryItemDataBuilder, authorizationService, permissionService, inventoryItem, deferred;

    beforeEach(function() {
        module('cce-inventory-item-status');

        inject(function($injector) {
            $q = $injector.get('$q');
            $state = $injector.get('$state');
            openlmisModalService = $injector.get('openlmisModalService');
            inventoryItemService = $injector.get('inventoryItemService');
            authorizationService = $injector.get('authorizationService');
            permissionService = $injector.get('permissionService');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
        });

        state = $state.get('openlmis.cce.inventory.item.statusUpdate');
        $stateParams = {};
        inventoryItem = new FacilityProgramInventoryItemDataBuilder().build();
        dialogSpy = jasmine.createSpyObj('dialog', ['hide']);
        deferred = $q.defer();

        spyOn(authorizationService, 'getUser').andReturn({
            //eslint-disable-next-line camelcase
            user_id: 'user-id'
        });
        spyOn($state, 'go');
        spyOn(openlmisModalService, 'createDialog').andReturn(dialogSpy);
        spyOn(inventoryItemService, 'get').andReturn($q.when(inventoryItem));
        spyOn(permissionService, 'hasPermission').andReturn(deferred.promise);
    });

    it('should accept inventoryItemId', function() {
        expect(state.url.indexOf('statusUpdate') > -1).toBe(true);
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

});
