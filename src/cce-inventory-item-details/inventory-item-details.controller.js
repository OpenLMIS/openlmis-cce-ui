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
     * @name cce-inventory-item-details.controller:InventoryItemDetailsController
     *
     * @description
     * Exposes inventory item to the view.
     */
    angular
        .module('cce-inventory-item-details')
        .controller('InventoryItemDetailsController', InventoryItemDetailsController);

    InventoryItemDetailsController.$inject = [
        'inventoryItem', 'CCE_STATUS', 'UTILIZATION_STATUS', 'MANUAL_TEMPERATURE_GAUGE_TYPE',
        'REMOTE_TEMPERATURE_MONITOR_TYPE',
    ];

    function InventoryItemDetailsController(inventoryItem, CCE_STATUS, UTILIZATION_STATUS,
                                            MANUAL_TEMPERATURE_GAUGE_TYPE,
                                            REMOTE_TEMPERATURE_MONITOR_TYPE) {
        var vm = this;

        vm.$onInit = onInit;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-details.controller:InventoryItemDetailsController
         * @name $onInit
         *
         * @description
         * Initialization method of the InventoryItemDetailsController.
         */
        function onInit() {
            vm.inventoryItem = inventoryItem;
            vm.getStatusLabel = CCE_STATUS.getLabel;
            vm.getUtilizationStatusLabel = UTILIZATION_STATUS.getLabel;
            vm.getManualTemperatureGaugeTypeLabel = MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel;
            vm.getRemoteTemperatureMonitorTypeLabel = REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel;
        }
    }

})();
