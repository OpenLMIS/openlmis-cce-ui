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
describe('openlmis.cce.inventory.details state', function() {

    var state, $timeout, $rootScope, $state, $stateParams, $q, paginationService,
        inventoryItemFactory, programService, openlmisModalService, program, inventoryItem,
        InventoryItemDataBuilder, ProgramDataBuilder;

    beforeEach(function() {
        loadModules();
        injectServices();
        prepareTestData();
        prepareSpies();
    });

    it('should include inventoryItemId in the URL', function() {
        expect(state.url.indexOf(':inventoryItemId') > -1).toBe(true);
    });

    describe('inventoryItem resolve', function() {

        var resolve;

        beforeEach(function() {
            resolve = state.resolve;
        });

        it('should download inventory item if it is not given via state params', function() {
            var result;
            resolve.inventoryItem($stateParams, inventoryItemFactory).then(function(inventoryItem) {
                result = inventoryItem;
            });
            $rootScope.$apply();

            expect(result).toEqual(inventoryItem);
            expect(inventoryItemFactory.get).toHaveBeenCalled();
        });

        it('should use inventory item if it is given via state params', function() {
            $stateParams.inventoryItem = inventoryItem;

            var result;
            resolve.inventoryItem($stateParams, inventoryItemFactory, programService).then(function(inventoryItem) {
                result = inventoryItem;
            });
            $rootScope.$apply();

            inventoryItem.program = program;
            expect(result).toEqual(inventoryItem);
            expect(programService.get).toHaveBeenCalled();
            expect(inventoryItemFactory.get).not.toHaveBeenCalled();
        });
    });

    describe('on enter', function() {

        it('should open modal', function() {
            state.onEnter(openlmisModalService);

            expect(openlmisModalService.createDialog).toHaveBeenCalled();
        });

    });

    describe('modal', function() {

        var modal;

        beforeEach(function() {
            state.onEnter(openlmisModalService, inventoryItem);
            modal = openlmisModalService.createDialog.calls[0].args[0];
        });

        it('should expose inventoryItem', function() {
            var result;

            result = modal.resolve.inventoryItem(inventoryItem);

            expect(result).toEqual(inventoryItem);
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
            $timeout = $injector.get('$timeout');
            $rootScope = $injector.get('$rootScope');
            paginationService = $injector.get('paginationService');
            $stateParams = $injector.get('$stateParams');
            inventoryItemFactory = $injector.get('inventoryItemFactory');
            programService = $injector.get('programService');
            openlmisModalService = $injector.get('openlmisModalService');
            InventoryItemDataBuilder = $injector.get('InventoryItemDataBuilder');
            ProgramDataBuilder = $injector.get('ProgramDataBuilder');
        });
    }

    function prepareTestData() {
        state = $state.get('openlmis.cce.inventory.details');

        program = new ProgramDataBuilder().build();
        inventoryItem = new InventoryItemDataBuilder().build();

        $stateParams = {
            inventoryItemId: inventoryItem.id,
            inventoryItem: undefined
        };
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
