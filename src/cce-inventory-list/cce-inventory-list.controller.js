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
     * @name cce-inventory-list.controller:CCEInventoryListController
     *
     * @description
     * Controller for CCE inventory item list screen.
     */
    angular
        .module('cce-inventory-list')
        .controller('CCEInventoryListController', CCEInventoryListController);

    CCEInventoryListController.$inject = ['inventoryItems', 'FUNCTIONAL_STATUS'];

    function CCEInventoryListController(inventoryItems, FUNCTIONAL_STATUS) {
        var vm = this;

        vm.$onInit = onInit;
        vm.getFunctionalStatusClass = getFunctionalStatusClass;

        /**
         * @ngdoc property
         * @propertyOf cce-inventory-list.controller:CCEInventoryListController
         * @name inventoryItems
         * @type {Array}
         *
         * @description
         * Init method for CCEInventoryListController.
         */
        vm.inventoryItems = undefined;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CCEInventoryListController
         * @name onInit
         *
         * @description
         * Init method for CCEInventoryListController.
         */
        function onInit() {
            vm.inventoryItems = inventoryItems;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CCEInventoryListController
         * @name onInit
         *
         * @description
         * Init method for CCEInventoryListController.
         *
         * @param  {String} status functional status name
         * @return {String}        functional status class for circle
         */
        function getFunctionalStatusClass(status) {
            var statusClass;

            switch (status) {
                case FUNCTIONAL_STATUS.FUNCTIONAL_STATUS:
                    statusClass = 'is-functioning';
                    break;
                case FUNCTIONAL_STATUS.NON_FUNCTIONING:
                case FUNCTIONAL_STATUS.AWAITING_REPAIR:
                case FUNCTIONAL_STATUS.UNSERVICABLE:
                    statusClass = 'is-non-functioning';
                    break;
                case FUNCTIONAL_STATUS.OBSOLETE:
                    statusClass = 'is-obsolete';
                    break;
            }

            return statusClass;
        }
    }

})();
