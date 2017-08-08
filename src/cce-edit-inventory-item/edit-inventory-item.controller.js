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

(function() {

    'use strict';

    /**
     * @ngdoc controller
     * @name cce-edit-inventory-item.controller:EditInventoryItemController
     *
     * @description
     * Provides methods for managing Edit Inventory Item modal.
     */
    angular
        .module('cce-edit-inventory-item')
        .controller('EditInventoryItemController', controller);

    controller.$inject = [
        'inventoryItem', 'VOLTAGE_STABILIZER_STATUS', 'VOLTAGE_REGULATOR_STATUS',
        'BACKUP_GENERATOR_STATUS', 'MANUAL_TEMPERATURE_GAUGE_TYPE', 'ENERGY_SOURCE'
    ];

    function controller(inventoryItem, VOLTAGE_STABILIZER_STATUS, VOLTAGE_REGULATOR_STATUS,
                        BACKUP_GENERATOR_STATUS, MANUAL_TEMPERATURE_GAUGE_TYPE, ENERGY_SOURCE) {
        var vm = this;

        vm.$onInit = onInit;
        vm.getVoltageStabilizerStatusLabel = VOLTAGE_STABILIZER_STATUS.getLabel;
        vm.getVoltageRegulatorStatusLabel = VOLTAGE_REGULATOR_STATUS.getLabel;
        vm.getBackupGeneratorStatusLabel = BACKUP_GENERATOR_STATUS.getLabel;
        vm.getManualTemperatureGaugeTypeLabel = MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel;

        /**
         * @ngdoc method
         * @methodOf cce-edit-inventory-item.controller:EditInventoryItemController
         * @name $onInit
         *
         * @description
         * Initialization method of the EditInventoryItemController.
         */
        function onInit() {
            vm.inventoryItem = inventoryItem;
            vm.voltageStabilizerStatuses = VOLTAGE_STABILIZER_STATUS.getStatuses();
            vm.voltageRegulatorStatuses = VOLTAGE_REGULATOR_STATUS.getStatuses();
            vm.backupGeneratorStatuses = BACKUP_GENERATOR_STATUS.getStatuses();
            vm.manualTemperatureGaugeTypes = MANUAL_TEMPERATURE_GAUGE_TYPE.getTypes();
            vm.powerFieldsDisabled = shouldDisablePowerFields(inventoryItem.catalogItem.energySource);
        }

        function shouldDisablePowerFields(source) {
            return (source === ENERGY_SOURCE.SOLAR || source === ENERGY_SOURCE.NOT_APPLICABLE);
        }
    }

})();
