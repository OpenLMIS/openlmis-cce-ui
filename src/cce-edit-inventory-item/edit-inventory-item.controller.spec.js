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

describe('EditInventoryItemController', function() {

    var vm, $controller, VOLTAGE_STABILIZER_STATUS, VOLTAGE_REGULATOR_STATUS,
        BACKUP_GENERATOR_STATUS, MANUAL_TEMPERATURE_GAUGE_TYPE, ENERGY_SOURCE, inventoryItem;

    beforeEach(function() {
        module('cce-edit-inventory-item');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            VOLTAGE_STABILIZER_STATUS = $injector.get('VOLTAGE_STABILIZER_STATUS');
            VOLTAGE_REGULATOR_STATUS = $injector.get('VOLTAGE_REGULATOR_STATUS');
            BACKUP_GENERATOR_STATUS = $injector.get('BACKUP_GENERATOR_STATUS');
            MANUAL_TEMPERATURE_GAUGE_TYPE = $injector.get('MANUAL_TEMPERATURE_GAUGE_TYPE');
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

        vm = $controller('EditInventoryItemController', {
            inventoryItem: inventoryItem
        });
    });

    describe('$onInit', function() {

        it('should expose inventory item', function() {
            vm.$onInit();

            expect(vm.inventoryItem).toEqual(inventoryItem);
        });

        it('should expose getVoltageStabilizerStatusLabel', function() {
            vm.$onInit();

            expect(vm.getVoltageStabilizerStatusLabel).toBe(VOLTAGE_STABILIZER_STATUS.getLabel);
        });

        it('should expose the list available voltage stabilizer statuses', function() {
            vm.$onInit();

            expect(vm.voltageStabilizerStatuses).toEqual(VOLTAGE_STABILIZER_STATUS.getStatuses());
        });

        it('should expose getVoltageRegulatorStatusLabel', function() {
            vm.$onInit();

            expect(vm.getVoltageRegulatorStatusLabel).toBe(VOLTAGE_REGULATOR_STATUS.getLabel);
        });

        it('should expose the list available voltage regulator statuses', function() {
            vm.$onInit();

            expect(vm.voltageRegulatorStatuses).toEqual(VOLTAGE_REGULATOR_STATUS.getStatuses());
        });

        it('should expose getBackupGeneratorStatusLabel', function() {
            vm.$onInit();

            expect(vm.getBackupGeneratorStatusLabel).toBe(BACKUP_GENERATOR_STATUS.getLabel);
        });

        it('should expose the list available voltage regulator statuses', function() {
            vm.$onInit();

            expect(vm.backupGeneratorStatuses).toEqual(BACKUP_GENERATOR_STATUS.getStatuses());
        });

        it('should expose getManualTemperatureGaugeTypeLabel', function() {
            vm.$onInit();

            expect(vm.getManualTemperatureGaugeTypeLabel).toBe(MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel);
        });

        it('should expose the list available manual temperature gauge types', function() {
            vm.$onInit();

            expect(vm.manualTemperatureGaugeTypes).toEqual(MANUAL_TEMPERATURE_GAUGE_TYPE.getTypes());
        });

        it('should set powerFieldsDisabled to false if ENERGY_SOURCE is ELECTRIC', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.ELECTRIC;

            vm.$onInit();

            expect(vm.powerFieldsDisabled).toBe(false);
        });

        it('should set powerFieldsDisabled to false if ENERGY_SOURCE is GASOLINE', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.GASOLINE;

            vm.$onInit();

            expect(vm.powerFieldsDisabled).toBe(false);
        });

        it('should set powerFieldsDisabled to true if ENERGY_SOURCE is SOLAR', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.SOLAR;

            vm.$onInit();

            expect(vm.powerFieldsDisabled).toBe(true);
        });

        it('should set powerFieldsDisabled to true if ENERGY_SOURCE is NOT_APPLICABLE', function() {
            inventoryItem.catalogItem.energySource = ENERGY_SOURCE.NOT_APPLICABLE;

            vm.$onInit();

            expect(vm.powerFieldsDisabled).toBe(true);
        });

    });

});
