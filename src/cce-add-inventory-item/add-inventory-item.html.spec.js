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

describe('add-inventory-item.html template', function() {

    var template, $compile, $rootScope, $scope, $templateRequest, $controller,
        authorizationService, $timeout, $state, program, facility, types, type, catalogItem,
        catalogItems, CatalogItemDataBuilder, ProgramDataBuilder, FacilityDataBuilder;

    beforeEach(function() {
        module('openlmis-form');
        module('cce-inventory-list');
        module('cce-add-inventory-item', function($provide) {
            $provide.factory('openlmisFacilityProgramSelectComponent', function() {
                return {};
            });
        });

        inject(function($injector) {
            $controller = $injector.get('$controller');
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            $templateRequest = $injector.get('$templateRequest');
            $timeout = $injector.get('$timeout');
            $state = $injector.get('$state');
            facilityService = $injector.get('facilityService');
            programService = $injector.get('programService');
            CatalogItemDataBuilder = $injector.get('CatalogItemDataBuilder');
            ProgramDataBuilder = $injector.get('ProgramDataBuilder');
            FacilityDataBuilder = $injector.get('FacilityDataBuilder');
        });

        spyOn(facilityService, 'getAllMinimal').andReturn($q.resolve(true));
        spyOn(programService, 'getUserPrograms').andReturn($q.resolve(true));

        types = [
            'Freezer',
            'Refrigerator'
        ];

        catalogItems = [
            new CatalogItemDataBuilder().withModel('LOL-1337').build(),
            new CatalogItemDataBuilder().withModel('LPL-101').withType(types[1]).build(),
            new CatalogItemDataBuilder().withType(types[1]).build()
        ];

        program = new ProgramDataBuilder().build();
        facility = new FacilityDataBuilder().build();

        type = types[0];

        catalogItem = catalogItems[0];

        prepareView();

        spyOn($state, 'go').andReturn();
    });

    describe('Equipment Type select', function() {

        var select;

        beforeEach(function() {
            select = template.find('#type')
        });

        it('should be required', function() {
            expect(
                select.prop('required')
            ).toBe(true);
        });

        it('should clear make/model selection on change', function() {
            select.find('option:contains("' + types[1] + '")')
                .prop('selected', 'selected')
                .trigger('change');

            expect($scope.vm.clearMakeModelSelection).toHaveBeenCalled();
        });

    });

    describe('Make/Model select', function() {

        var select;

        beforeEach(function() {
            select = template.find('#make-model');
        });

        it('should be disabled until equipment type is selected', function() {
            $scope.vm.type = undefined;
            $rootScope.$apply();

            expect(select.prop('disabled')).toBe(true);
        });

        it('should be enabled if equipment type is selected', function() {
            $scope.vm.type = 'Refrigerator';
            $rootScope.$apply();

            expect(select.prop('disabled')).toBe(false);
        });

        it('should be required', function() {
            expect(select.prop('required')).toBe(true);
        });

        it('should only show options for selected type', function() {
            $scope.vm.type = types[1];

            $rootScope.$apply();

            expect(select.find('option').length).toBe(3);
            expect(select.html().indexOf('LOL-1337') === -1).toBe(true);
        });

    });

    describe('Cancel button', function() {

        it('should call vm.goToInventoryList method', function() {
            template.find('#cancel').click();
            $timeout.flush();

            expect($scope.vm.goToInventoryList).toHaveBeenCalled();
        });

    });

    //The reason this is split from the form test itself is that somehow submit button doesn't
    //trigger ng-submit in tests
    describe('Add button', function() {

        var button;

        beforeEach(function() {
            button = template.find('#add');
        });

        it('should point to the add-inventory-item-form', function() {
            expect(button.attr('form')).toEqual('add-inventory-item-form');
        });

        it('should be a submit type', function() {
            expect(button.attr('type')).toEqual('submit');
        });

    });

    describe('add-inventory-item-form', function() {

        var form;

        beforeEach(function() {
            form = template.find('#add-inventory-item-form');
            spyOn($scope.vm, 'addInventoryItem');
        });

        it('should call $scope.vm.addInventoryItem method', function() {
            $scope.vm.program = program;
            $scope.vm.facility = facility;
            $scope.vm.type = type;
            $scope.vm.catalogItem = catalogItem;

            $rootScope.$apply();
            form.triggerHandler('submit');
            $rootScope.$apply();

            expect($scope.vm.addInventoryItem).toHaveBeenCalled();
        });

    });

    function prepareView() {
        $scope = $rootScope.$new();
        $scope.vm = {
            catalogItems: catalogItems,
            types: types,
            addInventoryItem: jasmine.createSpy('addInventoryItem'),
            goToInventoryList: jasmine.createSpy('goToInventoryList'),
            clearMakeModelSelection: jasmine.createSpy('clearMakeModelSelection')
        };

        $templateRequest('cce-add-inventory-item/add-inventory-item.html').then(function(requested) {
            template = $compile(requested)($scope);
        });
        $rootScope.$apply();
    }

});
