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
        'inventoryItem', '$scope', '$state', 'confirmService', 'CCE_STATUS',
        'MANUAL_TEMPERATURE_GAUGE_TYPE', 'ENERGY_SOURCE', 'UTILIZATION_STATUS',
        'REMOTE_TEMPERATURE_MONITOR_TYPE', 'inventoryItemService', 'loadingModalService'
    ];

    function controller(inventoryItem, $scope, $state, confirmService, CCE_STATUS,
                        MANUAL_TEMPERATURE_GAUGE_TYPE, ENERGY_SOURCE, UTILIZATION_STATUS,
                        REMOTE_TEMPERATURE_MONITOR_TYPE, inventoryItemService,
                        loadingModalService) {
        var vm = this;

        vm.$onInit = onInit;
        vm.getStatusLabel = CCE_STATUS.getLabel;
        vm.getManualTemperatureGaugeTypeLabel = MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel;
        vm.getRemoteTemperatureMonitorTypeLabel = REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel;
        vm.getUtilizationStatusLabel = UTILIZATION_STATUS.getLabel;
        vm.add = add;
        vm.cancel = cancel;

        /**
         * @ngdoc property
         * @propertyOf cce-edit-inventory-item.controller:EditInventoryItemController
         * @type {Object}
         * @name inventoryItem
         *
         * @description
         * The exposed inventory item.
         */
        vm.inventoryItem = undefined;

        /**
         * @ngdoc property
         * @propertyOf cce-edit-inventory-item.controller:EditInventoryItemController
         * @type {Array}
         * @name voltageStabilizerStatuses
         *
         * @description
         * The list of available cce statuses.
         */
        vm.cceStatuses = undefined;

        /**
         * @ngdoc property
         * @propertyOf cce-edit-inventory-item.controller:EditInventoryItemController
         * @type {Array}
         * @name manualTemperatureGaugeTypes
         *
         * @description
         * The list of available Manual Temperature Gauge types.
         */
        vm.manualTemperatureGaugeTypes = undefined;

        /**
         * @ngdoc property
         * @propertyOf cce-edit-inventory-item.controller:EditInventoryItemController
         * @type {Boolean}
         * @name powerFieldsDisabled
         *
         * @description
         * Flag defining whether Voltage Stabilizer, Voltage Regulator and Backup Generator fieldset
         * should be disabled.
         */
        vm.powerFieldsDisabled = undefined;

        /**
         * @ngdoc method
         * @methodOf cce-edit-inventory-item.controller:EditInventoryItemController
         * @name $onInit
         *
         * @description
         * Initialization method of the EditInventoryItemController.
         */
        function onInit() {
            vm.inventoryItem = angular.copy(inventoryItem);
            vm.cceStatuses = CCE_STATUS.getStatuses();
            vm.manualTemperatureGaugeTypes = MANUAL_TEMPERATURE_GAUGE_TYPE.getTypes();
            vm.remoteTemperatureMonitorTypes = REMOTE_TEMPERATURE_MONITOR_TYPE.getTypes();
            vm.utilizationStatuses = UTILIZATION_STATUS.getStatuses();
            vm.powerFieldsDisabled = shouldDisablePowerFields(inventoryItem.catalogItem.energySource);
        }

        /**
         * @ngdoc method
         * @methodOf cce-edit-inventory-item.controller:EditInventoryItemController
         * @name add
         *
         * @description
         * Takes the user to the status update screen.
         */
        function add() {
            if (vm.inventoryItem.id) {
                loadingModalService.open();
                inventoryItemService.save(vm.inventoryItem)
                    .then(function(inventoryItem) {
                        $state.go('openlmis.cce.inventory.details', {
                            inventoryItem: inventoryItem,
                            inventoryItemId: inventoryItem.id
                        }, {
                            reload: true
                        });
                    })
                    .catch(loadingModalService.close);
            } else {
                $state.go('openlmis.cce.inventory.statusUpdate', {
                    inventoryItem: vm.inventoryItem
                });
            }
        }

        /**
         * @ngdoc method
         * @methodOf cce-edit-inventory-item.controller:EditInventoryItemController
         * @name cancel
         *
         * @description
         * Takes the user to the inventory item list screen. Will open a confirmation modal if user
         * interacted with the form.
         */
        function cancel() {
            if ($scope.editInventoryItemForm.$dirty) {
                confirmService.confirm(
                    'cceEditInventoryItem.closeAddInventoryItemModal',
                    'cceEditInventoryItem.yes',
                    'cceEditInventoryItem.no'
                ).then(doCancel);
            } else {
                doCancel();
            }
        }

        function doCancel() {
            if (inventoryItem.id) {
                $state.go('openlmis.cce.inventory.details', {
                    inventoryItem: inventoryItem,
                    inventoryItemId: inventoryItem.id
                });
            } else {
                $state.go('openlmis.cce.inventory');
            }
        }

        function shouldDisablePowerFields(source) {
            return (source === ENERGY_SOURCE.SOLAR || source === ENERGY_SOURCE.NOT_APPLICABLE);
        }
    }

})();
