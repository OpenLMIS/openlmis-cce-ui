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

    function prepareView() {
        vm = $controller('EditInventoryItemController', {
            inventoryItem: inventoryItem
        });
        vm.$onInit();

        $scope = $rootScope.$new();
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
