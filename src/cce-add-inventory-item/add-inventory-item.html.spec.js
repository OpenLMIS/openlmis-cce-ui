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

    var template, $compile, $rootScope, $scope, $templateRequest, $controller, vm,
        authorizationService, $timeout, $state, program, facility, types, type, catalogItem, catalogItems;

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
        });

        types = [
            'Walk-in freezer',
            'Refrigerator'
        ];

        catalogItems = [{
            manufacturer: 'Haier',
            model: 'LOL-1337',
            type: types[0]
        }, {
            manufacturer: 'Haier',
            model: 'LPL-101',
            type: types[1]
        }, {
            manufacturer: 'Cooltec',
            model: 'X-GGTA 1',
            type: types[1]
        }];

        program = {
            id: 'program-id',
            name: 'Program One'
        };

        facility = {
            id: 'facility-id',
            name: 'Facility One'
        };

        type = types[0];

        catalogItem = catalogItems[0];

        prepareView();

        spyOn($state, 'go').andReturn();
    });

    describe('Equipment Type select', function() {

        var select;

        beforeEach(function() {
            select = getElement('select', 'type');
        });

        it('should be required', function() {
            expect(select.prop('required')).toBe(true);
        });

    });

    describe('Make/Model select', function() {

        var select;

        beforeEach(function() {
            select = getElement('select', 'make-model');
        });

        it('should be disabled until equipment type is selected', function() {
            vm.type = undefined;
            $rootScope.$apply();

            expect(select.prop('disabled')).toBe(true);
        });

        it('should be enabled if equipment type is selected', function() {
            vm.type = 'Refrigerator';
            $rootScope.$apply();

            expect(select.prop('disabled')).toBe(false);
        });

        it('should be required', function() {
            expect(select.prop('required')).toBe(true);
        });

        it('should only show options for selected type', function() {
            vm.type = types[1];

            $rootScope.$apply();

            expect(select.find('option').length).toBe(3);
            expect(select.html().indexOf('LOL-1337') === -1).toBe(true);
        });

        it('should clear selection if type changed', function() {
            vm.type = types[0];
            vm.catalogItem = vm.catalogItems[0];
            $rootScope.$apply();
            expect(getSelectedOption(select).indexOf('openlmisForm.selectAnOption') > -1)
                .toBe(false);

            vm.type = types[1];
            $rootScope.$apply();
            expect(getSelectedOption(select).indexOf('openlmisForm.selectAnOption') > -1)
                .toBe(true);
        });

    });

    describe('Cancel button', function() {

        var button, formCtrl, confirmService, confirmDeferred, $q;

        beforeEach(function() {
            inject(function($injector) {
                confirmService = $injector.get('confirmService');
                $q = $injector.get('$q');
            });

            confirmDeferred = $q.defer();
            spyOn(confirmService, 'confirm').andReturn(confirmDeferred.promise);

            button = getElement('button', 'cancel');
            formCtrl = getElement('form', 'add-inventory-item-form').controller('form');
        });

        it('should take user back to the inventory item list if the form was not dirty', function() {
            button.click();
            $timeout.flush();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory');
        });

        it('should open confirmation modal if form was touched', function() {
            formCtrl.$setDirty();
            $rootScope.$apply();

            button.click();

            expect(confirmService.confirm).toHaveBeenCalled();
            expect($state.go).not.toHaveBeenCalled();
        });

        it('should take user back if form was dirty and confirmation was successful', function() {
            formCtrl.$setDirty();
            $rootScope.$apply();

            button.click();
            $rootScope.$apply();

            expect(confirmService.confirm).toHaveBeenCalled();
            expect($state.go).not.toHaveBeenCalled();

            confirmDeferred.resolve();
            $rootScope.$apply();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory');
        });

        it('should not take user back if form was dirty and confirmation was unsuccessful', function() {
            formCtrl.$setDirty();
            $rootScope.$apply();

            button.click();
            $rootScope.$apply();

            expect(confirmService.confirm).toHaveBeenCalled();
            expect($state.go).not.toHaveBeenCalled();

            confirmDeferred.reject();
            $rootScope.$apply();

            expect($state.go).not.toHaveBeenCalled();
        });

    });

    //The reason this is split from the form test itself is that somehow submit button doesn't
    //trigger ng-submit in tests
    describe('Add button', function() {

        var button;

        beforeEach(function() {
            button = getElement('button', 'add');
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
            form = getElement('form', 'add-inventory-item-form');
        });

        it('should do nothing if form is invalid', function() {
            vm.type = undefined;

            $rootScope.$apply();
            form.triggerHandler('submit');

            expect($state.go).not.toHaveBeenCalled();
        });

        it('should take the use to the edit details modal if form is valid', function() {
            vm.program = program;
            vm.facility = facility;
            vm.type = type;
            vm.catalogItem = catalogItem;

            $rootScope.$apply();
            form.triggerHandler('submit');

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.edit', {
                inventoryItem: angular.toJson({
                    facility: facility,
                    programId: 'program-id',
                    program: program,
                    catalogItem: catalogItem
                })
            });
        });

    });

    function prepareView() {
        $scope = $rootScope.$new();

        vm = $controller('AddInventoryItemController', {
            $scope: $scope,
            types: types,
            catalogItems: catalogItems
        });
        vm.$onInit();

        $scope.vm = vm;

        $templateRequest('cce-add-inventory-item/add-inventory-item.html').then(function(requested) {
            template = $compile(requested)($scope);
        });
        $rootScope.$apply();
    }

    function getElement(type, id) {
        var result;

        angular.forEach(template.find(type), function(element) {
            if (angular.element(element).attr('id') === id) {
                result = angular.element(element);
            }
        });

        return result;
    }

    function getSelectedOption(select) {
        var selected;

        angular.forEach(select.find('option'), function(option) {
            if (angular.element(option).attr('selected')) {
                selected = angular.element(option);
            }
        });

        return selected.html();
    }

});
