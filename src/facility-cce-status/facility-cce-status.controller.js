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
     * @name facility-cce-status.controller:CceStatusController
     *
     * @description
     * Exposes CCE status to the view.
     */
    angular
        .module('facility-cce-status')
        .controller('CceStatusController', CceStatusController);

    CceStatusController.$inject = ['FUNCTIONAL_STATUS', 'inventoryItemService', 'FACILITY_CCE_STATUS'];

    function CceStatusController(FUNCTIONAL_STATUS, inventoryItemService, FACILITY_CCE_STATUS) {
        var vm = this;

        vm.$onInit = onInit;

        /**
         * @ngdoc property
         * @propertyOf facility-cce-status.controller:CceStatusController
         * @name page
         * @type {String}
         *
         * @description
         * Holds status label.
         */
        vm.statusLabel = undefined;

        /**
         * @ngdoc property
         * @propertyOf facility-cce-status.controller:CceStatusController
         * @name page
         * @type {String}
         *
         * @description
         * Holds status class.
         */
        vm.statusClass = undefined;

        /**
         * @ngdoc method
         * @methodOf facility-cce-status.controller:CceStatusController
         * @name $onInit
         *
         * @description
         * Initialization method of the CceStatusController.
         */
        function onInit() {
            setLabelAndClass(FACILITY_CCE_STATUS.LOADING);
            inventoryItemService.getAllForFacility(vm.facility.id)
            .then(function (list) {
                var status = getStatus(list);
                setLabelAndClass(status);
            });
        }

        /**
         * @ngdoc method
         * @methodOf facility-cce-status.controller:CceStatusController
         * @name getStatus
         *
         * @description
         * Returns a Status based on inventory response.
         *
         * @param   {Object}    list    cce status
         * @return  {String}            the label for the inventory item
         */
        function getStatus(list) {
            var notFunctioningInventoryItems = filterNotFunctioningInventoryItems(list);
            if (notFunctioningInventoryItems.length === list.length) {
                return FACILITY_CCE_STATUS.NOT_FUNCTIONING;
            } else if (notFunctioningInventoryItems.length > 0) {
                return FACILITY_CCE_STATUS.NOT_FULLY_FUNCTIONING;
            }
            return FACILITY_CCE_STATUS.All_FUNCTIONING;
        }

        function filterNotFunctioningInventoryItems(list) {
            return list.filter(function (inventory) {
                return inventory.functionalStatus !== FUNCTIONAL_STATUS.FUNCTIONING
            });
        }

        function setLabelAndClass(status) {
            vm.statusLabel = FACILITY_CCE_STATUS.getLabel(status);
            vm.statusClass = FACILITY_CCE_STATUS.getClass(status);
        }

    }

})();
