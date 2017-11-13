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

describe('openlmis.cce.inventory.edit state', function() {

    var $state, $q, openlmisModalService, inventoryItemService, facilityService, CCE_RIGHTS, state, dialogSpy,
        inventoryItem, inventoryItemTwo, $stateParams, facility, InventoryItemSpy;

    beforeEach(function() {
        module('openlmis-main-state');
        module('cce');
        module('cce-inventory-list');

        module('cce-edit-inventory-item', function($provide) {
            InventoryItemSpy = jasmine.createSpy('InventoryItem').andReturn(inventoryItem);
        });

        inject(function($injector) {
            $q = $injector.get('$q');
            $state = $injector.get('$state');
            openlmisModalService = $injector.get('openlmisModalService');
            $rootScope = $injector.get('$rootScope');
            $timeout = $injector.get('$timeout');
            CCE_RIGHTS = $injector.get('CCE_RIGHTS');
            inventoryItemService = $injector.get('inventoryItemService');
            facilityService = $injector.get('facilityService');
        });

        dialogSpy = jasmine.createSpyObj('dialog', ['hide']);

        facility = {
            id: 'facility-id',
            name: 'facility'
        };

        inventoryItem = {
            program: {
                id: 'program-id',
                name: 'Program Name'
            },
            facility: {
                id: 'facility-id',
                name: 'Facility Name'
            },
            catalogItem: {
                id: 'catalog-item-id',
                make: 'Catalog Item Make',
                manufacturer: 'Catalog Item Manufacturer'
            }
        };

        inventoryItemTwo = {
            program: {
                id: 'program-two-id',
                name: 'Program Two Name'
            },
            facility: {
                id: 'facility-id',
                name: 'Facility Name'
            },
            catalogItem: {
                id: 'catalog-item-id',
                make: 'Catalog Item Make',
                manufacturer: 'Catalog Item Manufacturer'
            }
        };

        $stateParams = {};

        spyOn($state, 'go');
        spyOn(openlmisModalService, 'createDialog').andReturn(dialogSpy);
        spyOn(inventoryItemService, 'get').andReturn($q.when(inventoryItemTwo));

        state = $state.get('openlmis.cce.inventory.edit');
    });

    describe('onEnter', function() {

        it('should open modal', function() {
            state.onEnter(openlmisModalService);

            expect(openlmisModalService.createDialog).toHaveBeenCalled();
        });

        it('should reopen the modal if state was reentered', function() {
            //enter the state
            state.onEnter(openlmisModalService);

            expect(openlmisModalService.createDialog.calls.length).toBe(1);

            //reenter the state
            state.onExit();
            state.onEnter(openlmisModalService);

            expect(openlmisModalService.createDialog.calls.length).toBe(2);
        });

    });

    describe('modal', function() {

        var modal;

        it('should download inventoryItem if ID was given', function() {
            var result;

            $stateParams.inventoryItemId = 'some-inventory-item-id';

            state.onEnter(openlmisModalService, $stateParams, inventoryItemService);
            modal = openlmisModalService.createDialog.calls[0].args[0];
            modal.resolve.inventoryItem().then(function(inventoryItem) {
                result = inventoryItem;
            });
            $rootScope.$apply();

            expect(inventoryItemService.get).toHaveBeenCalledWith('some-inventory-item-id');
            expect(result).toBe(inventoryItemTwo);
        });

        it('should return inventoryItem', function() {
            var result;

            $stateParams.inventoryItem = inventoryItem;

            spyOn(facilityService, 'get').andReturn($q.when(facility));

            state.onEnter(openlmisModalService, $stateParams, inventoryItemService, facilityService, $state, InventoryItemSpy);
            modal = openlmisModalService.createDialog.calls[0].args[0];

            modal.resolve.inventoryItem().then(function(inventoryItem) {
                result = inventoryItem;
            });
            $rootScope.$apply();

            expect(inventoryItemService.get).not.toHaveBeenCalled();
            expect(result).toEqual(inventoryItem);
        });

        it('should redirect user to the add page if no ID or item is given', function() {
            state.onEnter(openlmisModalService, $stateParams, inventoryItemService, facilityService, $state);
            modal = openlmisModalService.createDialog.calls[0].args[0];

            modal.resolve.inventoryItem();
            $rootScope.$apply();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.add');
        });

    });

    it('onExit should close modal', function() {
        //enter the state
        state.onEnter(openlmisModalService);

        //exit the state
        state.onExit();

        expect(dialogSpy.hide).toHaveBeenCalled();
    });

    it('should require CCE_INVENTORY_EDIT right to enter', function() {
        expect(state.accessRights).toEqual([CCE_RIGHTS.CCE_INVENTORY_EDIT]);
    });

});
