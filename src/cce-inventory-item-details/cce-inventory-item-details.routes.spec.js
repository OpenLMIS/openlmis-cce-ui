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
describe('openlmis.cce.inventory.item.details state', function() {

    var state, $state, $q, paginationService, inventoryItemFactory, programService, openlmisModalService, program,
        inventoryItem, FacilityProgramInventoryItemDataBuilder;

    beforeEach(function() {
        loadModules();
        injectServices();
        prepareTestData();
        prepareSpies();
    });

    it('should include details in the URL', function() {
        expect(state.url.indexOf('details')).toBeGreaterThan(-1);
    });

    describe('on enter', function() {

        it('should open modal', function() {
            state.onEnter(openlmisModalService);

            expect(openlmisModalService.createDialog).toHaveBeenCalled();
        });

    });

    describe('modal', function() {

        var modal,
            canEdit = true;

        beforeEach(function() {
            state.onEnter(openlmisModalService, inventoryItem, canEdit);
            modal = openlmisModalService.createDialog.calls[0].args[0];
        });

        it('should expose inventoryItem', function() {
            var result;

            result = modal.resolve.inventoryItem(inventoryItem);

            expect(result).toEqual(inventoryItem);
        });

        it('should expose canEdit', function() {
            var result;

            result = modal.resolve.canEdit(true);

            expect(result).toEqual(true);
        });

        it('should use inventory-item-details.html template', function() {
            expect(modal.templateUrl)
                .toEqual('cce-inventory-item-details/inventory-item-details.html');
        });

        it('should use InventoryItemDetails controller', function() {
            expect(modal.controller).toEqual('InventoryItemDetailsController');
        });

        it('should expose controller as vm', function() {
            expect(modal.controllerAs).toEqual('vm');
        });

    });

    describe('on exit', function() {

        it('should close modal', function() {
            var dialogSpy = jasmine.createSpyObj('dialog', ['hide']);

            openlmisModalService.createDialog.andReturn(dialogSpy);

            state.onEnter(openlmisModalService);
            state.onExit();

            expect(dialogSpy.hide).toHaveBeenCalled();
        });

    });

    function loadModules() {
        module('cce-inventory-item-details');
    }

    function injectServices() {
        inject(function($injector) {
            $q = $injector.get('$q');
            $state = $injector.get('$state');
            paginationService = $injector.get('paginationService');
            inventoryItemFactory = $injector.get('inventoryItemFactory');
            programService = $injector.get('programService');
            openlmisModalService = $injector.get('openlmisModalService');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
        });
    }

    function prepareTestData() {
        state = $state.get('openlmis.cce.inventory.item.details');

        inventoryItem = new FacilityProgramInventoryItemDataBuilder().build();
        program = inventoryItem.program;
    }

    function prepareSpies() {
        spyOn(paginationService, 'registerUrl').andReturn();
        spyOn(inventoryItemFactory, 'get').andCallFake(function(id) {
            if (id === inventoryItem.id) {
                return $q.when(inventoryItem);
            }
            return $q.when();
        });
        spyOn(programService, 'get').andCallFake(function(id) {
            if (id === program.id) {
                return $q.when(program);
            }
            return $q.when();
        });

        spyOn(openlmisModalService, 'createDialog');
    }

});
