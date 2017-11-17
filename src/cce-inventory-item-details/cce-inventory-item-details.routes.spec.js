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
        FacilityProgramInventoryItemDataBuilder, ProgramDataBuilder;

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

    describe('canEdit resolve', function() {

        var resolve;

        beforeEach(function() {
            resolve = state.resolve;
        });

        it('should call permissionService to check if user has CCE_INVENTORY_EDIT right', function() {
            var result;
            resolve.canEdit(inventoryItem, authorizationService, permissionService, CCE_RIGHTS).then(function(canEdit) {
                result = canEdit;
            });

            deferred.resolve();
            $rootScope.$apply();

            expect(result).toEqual(true);
            expect(permissionService.hasPermission).toHaveBeenCalled();
            expect(authorizationService.getUser).toHaveBeenCalled();
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
            $timeout = $injector.get('$timeout');
            $rootScope = $injector.get('$rootScope');
            paginationService = $injector.get('paginationService');
            $stateParams = $injector.get('$stateParams');
            inventoryItemFactory = $injector.get('inventoryItemFactory');
            programService = $injector.get('programService');
            authorizationService = $injector.get('authorizationService');
            permissionService = $injector.get('permissionService');
            openlmisModalService = $injector.get('openlmisModalService');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
            ProgramDataBuilder = $injector.get('ProgramDataBuilder');
            CCE_RIGHTS = $injector.get('CCE_RIGHTS');
        });
    }

    function prepareTestData() {
        state = $state.get('openlmis.cce.inventory.details');

        program = new ProgramDataBuilder().build();
        inventoryItem = new FacilityProgramInventoryItemDataBuilder().build();

        $stateParams = {
            inventoryItemId: inventoryItem.id,
            inventoryItem: undefined
        };

        deferred = $q.defer();
    }

    function prepareSpies() {
        spyOn(paginationService, 'registerUrl').andReturn();
        spyOn(authorizationService, 'getUser').andReturn({ user_id: 'user-id' });
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

        spyOn(permissionService, 'hasPermission').andReturn(deferred.promise);
        spyOn(openlmisModalService, 'createDialog');
    }

});
