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

describe('openlmis.inventoryItems.add state', function() {

    var $state, $q, openlmisModalService, catalogItemService, catalogItemTypeFactory, CCE_RIGHTS,
        state, dialogSpy, types, catalogItems, CatalogItemDataBuilder;

    beforeEach(function() {
        module('openlmis-main-state');
        module('cce');
        module('cce-inventory-list');
        module('cce-add-inventory-item');

        inject(function($injector) {
            $state = $injector.get('$state');
            $q = $injector.get('$q');
            openlmisModalService = $injector.get('openlmisModalService');
            $rootScope = $injector.get('$rootScope');
            $timeout = $injector.get('$timeout');
            CCE_RIGHTS = $injector.get('CCE_RIGHTS');
            catalogItemService = $injector.get('catalogItemService');
            catalogItemTypeFactory = $injector.get('catalogItemTypeFactory');
            CatalogItemDataBuilder = $injector.get('CatalogItemDataBuilder');
        });

        types = [
            'Freezer',
            'Refrigerator'
        ];

        catalogItems = [
            new CatalogItemDataBuilder().withModel('LOL-1337').build(),
            new CatalogItemDataBuilder().withModel('LPL-101').withType(types[1]).build(),
            new CatalogItemDataBuilder().withType(types[1]).build()
        ];

        spyOn(catalogItemService, 'search').andReturn($q.when({
            content: catalogItems,
            last: true,
            totalElements: 0,
            totalPages: 0,
            sort: null,
            first: true,
            numberOfElements: 0,
            size: 2000,
            number: 0
        }));

        dialogSpy = jasmine.createSpyObj('dialog', ['hide']);

        spyOn(openlmisModalService, 'createDialog').andReturn(dialogSpy);

        state = $state.get('openlmis.cce.inventory.add');
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

        var modal, catalogItemTypeFactory, catalogItemService, $q;

        beforeEach(function() {
            state.onEnter(
                openlmisModalService,
                catalogItems,
                types
            );

            modal = openlmisModalService.createDialog.calls[0].args[0];
        });

        it('should get a list of unique types based on the catalog items', function() {
            expect(modal.resolve.types()).toEqual(types);
        });

        it('should get a list of catalog items', function() {
            expect(modal.resolve.catalogItems()).toEqual(catalogItems);
        });

    });

    it('should fetch a list of catalog items', function() {
        var result;

        state.resolve.catalogItems(catalogItemService).then(function(catalogItems) {
            result = catalogItems;
        });
        $rootScope.$apply();

        expect(result).toEqual(catalogItems);
        expect(catalogItemService.search).toHaveBeenCalledWith(false, true);
    });

    it('should prepare a list of unique types', function() {
        expect(state.resolve.types(catalogItems, catalogItemTypeFactory)).toEqual(types);
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
