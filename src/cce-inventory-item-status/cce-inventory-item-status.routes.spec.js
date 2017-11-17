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

        it('should not close backdrop click', function() {
            expect(getModal().backdrop).toEqual('static');
        });

        it('should use inventory item from state params if it was given', function() {
            $stateParams.inventoryItem = inventoryItem;

            expect(getModal().resolve.inventoryItem()).toEqual(inventoryItem);
        });

        it('should download inventoryItem if ID was given', function() {
            $stateParams.inventoryItemId = 'some-inventory-item-id';

            var result;

            getModal().resolve.inventoryItem().then(function(inventoryItem) {
                result = inventoryItem;
            });
            $rootScope.$apply();

            expect(result).toEqual(inventoryItem);
        });

        it('should redirect user to the add page if no ID or item is given', function() {
            state.onEnter(openlmisModalService, $stateParams, inventoryItemService, $state);
            modal = openlmisModalService.createDialog.calls[0].args[0];

            getModal().resolve.inventoryItem();
            $rootScope.$apply();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.add');
        });

        function getModal() {
            state.onEnter(openlmisModalService, inventoryItemService, $stateParams);
            return openlmisModalService.createDialog.calls[0].args[0];
        }

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
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
        });
    }

    function prepareTestData() {
        state = $state.get('openlmis.cce.inventory.statusUpdate');
        $stateParams = {};
        inventoryItem = new FacilityProgramInventoryItemDataBuilder().build();
        dialogSpy = jasmine.createSpyObj('dialog', ['hide']);
    }

    function prepareSpies() {
        spyOn($state, 'go');
        spyOn(openlmisModalService, 'createDialog').andReturn(dialogSpy);
        spyOn(inventoryItemService, 'get').andReturn($q.when(inventoryItem));
    }

});
