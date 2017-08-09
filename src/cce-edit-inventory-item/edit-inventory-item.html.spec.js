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

describe('edit-inventory-item.html template', function() {

    var vm, $controller, $compile, $rootScope, $templateRequest, $timeout, $state, template,
        ENERGY_SOURCE;

    beforeEach(function() {
        module('openlmis-templates');
        module('openlmis-form');
        module('cce-edit-inventory-item');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            $templateRequest = $injector.get('$templateRequest');
            $timeout = $injector.get('$timeout');
            $state = $injector.get('$state');
            ENERGY_SOURCE = $injector.get('ENERGY_SOURCE');
        });

        inventoryItem = {
            catalogItem: {
                manufacturer: 'Cooltec',
                model: 'X-GGTA 1',
                type: 'Refrigerator'
            },
            program: {
                id: 'program-id',
                name: 'Program One'
            },
            facility: {
                id: 'facility-id',
                name: 'Facility One'
            }
        };

        spyOn($state, 'go').andReturn();
    });

    describe('Serial number input', function() {

        var input;

        beforeEach(function() {
            prepareView();
            input = getElement('input', 'serial-number');
        });

        it('should be required', function() {
            expect(input.prop('required')).toBe(true);
        });

    });

    describe('Reference Name input', function() {

        var input;

        beforeEach(function() {
            prepareView();
            input = getElement('input', 'reference-name');
        });

        it('should be required', function() {
            expect(input.prop('required')).toBe(true);
        });

    });

    describe('Year of Installation/Commission input', function() {

        var input;

        beforeEach(function() {
            prepareView();
            input = getElement('input', 'year-of-installation');
        });

        it('should be required', function() {
            expect(input.prop('required')).toBe(true);
        });

        it('should allow only year to be entered', function() {
            vm.inventoryItem.yearOfInstallation = 42443;

            $rootScope.$apply();

            expect($scope.editInventoryItemForm.yearOfInstallation.$valid).toBe(false);
        });

        it('should be valid for four-digit year', function() {
            vm.inventoryItem.yearOfInstallation = 2017;

            $rootScope.$apply();

            expect($scope.editInventoryItemForm.yearOfInstallation.$valid).toBe(true);
        });

    });

    describe('Year of Warranty Expiry', function() {

        var input;

        beforeEach(function() {
            prepareView();
            input = getElement('input', 'year-of-warranty-expiry');
        });

        it('should allow only year to be entered', function() {
            vm.inventoryItem.yearOfWarrantyExpiry = 42443;

            $rootScope.$apply();

            expect($scope.editInventoryItemForm.yearOfWarrantyExpiry.$valid).toBe(false);
        });

        it('should be valid for four-digit year', function() {
            vm.inventoryItem.yearOfWarrantyExpiry = 2017;

            $rootScope.$apply();

            expect($scope.editInventoryItemForm.yearOfWarrantyExpiry.$valid).toBe(true);

        });

    });

    describe('Voltage Stabilizer radio buttons', function() {

        var buttons, buttonsTested;


        it('should be required', function() {
            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                expect(angular.element(button).prop('required')).toBe(true);

                buttonsTested = true;
            });
        });

        it('should be disabled if Energy Source is Solar', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.SOLAR;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(true);
                expect(element.prop('required')).toBe(false);

                buttonsTested = true;
            });
        });

        it('should be disabled if Energy Source is Not Applicable', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.NOT_APPLICABLE;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(true);
                expect(element.prop('required')).toBe(false);

                buttonsTested = true;
            });
        });

        it('should be enabled if Energy Source is Gasoline', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.GASOLINE;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(false);
                expect(element.prop('required')).toBe(true);

                buttonsTested = true;
            });
        });

        it('should be enabled if Energy Source is Electric', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.ELECTRIC;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(false);
                expect(element.prop('required')).toBe(true);

                buttonsTested = true;
            });
        });

        afterEach(function () {
            expect(buttonsTested).toBe(true);
        });

        function getButtons() {
            return getElement('fieldset', 'voltage-stabilizer').find('input');
        }

    });

    describe('Voltage regulator radio buttons', function() {

        var buttons, buttonsTested;

        it('should be required', function() {
            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                expect(angular.element(button).prop('required')).toBe(true);

                buttonsTested = true;
            });
        });

        it('should be disabled if Energy Source is Solar', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.SOLAR;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(true);
                expect(element.prop('required')).toBe(false);

                buttonsTested = true;
            });
        });

        it('should be disabled if Energy Source is Not Applicable', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.NOT_APPLICABLE;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(true);
                expect(element.prop('required')).toBe(false);

                buttonsTested = true;
            });
        });

        it('should be enabled if Energy Source is Gasoline', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.GASOLINE;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(false);
                expect(element.prop('required')).toBe(true);

                buttonsTested = true;
            });
        });

        it('should be enabled if Energy Source is Electric', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.ELECTRIC;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(false);
                expect(element.prop('required')).toBe(true);

                buttonsTested = true;
            });
        });

        afterEach(function () {
            expect(buttonsTested).toBe(true);
        });

        function getButtons() {
            return getElement('fieldset', 'voltage-regulator').find('input');
        }

    });

    describe('Backup Generator radio buttons', function() {

        var buttons, buttonsTested;

        it('should be required', function() {
            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                expect(angular.element(button).prop('required')).toBe(true);

                buttonsTested = true;
            });
        });

        it('should be disabled if Energy Source is Solar', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.SOLAR;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(true);
                expect(element.prop('required')).toBe(false);

                buttonsTested = true;
            });
        });

        it('should be disabled if Energy Source is Not Applicable', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.NOT_APPLICABLE;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(true);
                expect(element.prop('required')).toBe(false);

                buttonsTested = true;
            });
        });

        it('should be enabled if Energy Source is Gasoline', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.GASOLINE;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(false);
                expect(element.prop('required')).toBe(true);

                buttonsTested = true;
            });
        });

        it('should be enabled if Energy Source is Electric', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.ELECTRIC;

            prepareView();
            buttons = getButtons();

            angular.forEach(buttons, function(button) {
                var element = angular.element(button);

                expect(element.prop('disabled')).toBe(false);
                expect(element.prop('required')).toBe(true);

                buttonsTested = true;
            });
        });

        afterEach(function () {
            expect(buttonsTested).toBe(true);
        });

        function getButtons() {
            return getElement('fieldset', 'backup-generator').find('input');
        }

    });

    describe('Manual temperature gauge radio buttons', function() {

        var buttons, buttonsTested;

        beforeEach(function() {
            prepareView();
            buttons = getButtons();
        });

        it('should be required', function() {
            angular.forEach(buttons, function(button) {
                expect(angular.element(button).prop('required')).toBe(true);

                buttonsTested = true;
            });
        });

        afterEach(function () {
            expect(buttonsTested).toBe(true);
        });

        function getButtons() {
            return getElement('fieldset', 'manual-temperature-gauge').find('input');
        }

    });

    describe('edit-inventory-item-form', function() {

        var form;

        beforeEach(function() {
            prepareView();
            form = getElement('form', 'edit-inventory-item-form');
        });

        it('should take user to the status update modal after submit', function() {
            vm.inventoryItem.serialNumber = 'some-serial-number';
            vm.inventoryItem.referenceName = 'Reference Name';
            vm.inventoryItem.yearOfInstallation = 1998;
            vm.inventoryItem.voltageStabilizer = 'YES';
            vm.inventoryItem.voltageRegulator = 'NO';
            vm.inventoryItem.backupGenerator = 'UNKNOWN';
            vm.inventoryItem.manualTemperatureGauge = 'BUILD_IN';

            $rootScope.$apply();
            form.triggerHandler('submit');

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.statusUpdate', {
                inventoryItem: angular.toJson(vm.inventoryItem)
            });
        });

        it('should not take user anywhere if form is invalid', function() {
            vm.inventoryItem.serialNumber = 'some-serial-number';
            vm.inventoryItem.referenceName = 'Reference Name';
            vm.inventoryItem.yearOfInstallation = 1998;
            vm.inventoryItem.voltageStabilizer = undefined;
            vm.inventoryItem.voltageRegulator = 'NO';
            vm.inventoryItem.backupGenerator = 'UNKNOWN';
            vm.inventoryItem.manualTemperatureGauge = 'BUILD_IN';

            $rootScope.$apply();
            form.triggerHandler('submit');

            expect($state.go).not.toHaveBeenCalled();
        });

    });

    describe('Add button', function() {

        var button;

        beforeEach(function() {
            button = getElement('button', 'add');
        });

        it('should point to the edit-inventory-item-form', function() {
            expect(button.attr('form')).toEqual('edit-inventory-item-form');
        });

        it('should be a submit type', function() {
            expect(button.attr('type')).toEqual('submit');
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

            prepareView();

            button = getElement('button', 'cancel');
            formCtrl = getElement('form', 'edit-inventory-item-form').controller('form');
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

    function prepareView() {
        $scope = $rootScope.$new();

        vm = $controller('EditInventoryItemController', {
            $scope: $scope,
            inventoryItem: inventoryItem
        });
        vm.$onInit();

        $scope.vm = vm;

        $templateRequest(
            'cce-edit-inventory-item/edit-inventory-item.html'
        ).then(function(requested) {
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

});
