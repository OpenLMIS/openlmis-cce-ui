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
     * @name cce-inventory-list.controller:CceInventoryListController
     *
     * @description
     * Controller for CCE inventory item list screen.
     */
    angular
        .module('cce-inventory-list')
        .controller('CceInventoryListController', CceInventoryListController);

    CceInventoryListController.$inject = [
        'inventoryItems', '$state', 'FUNCTIONAL_STATUS', 'CCE_RIGHTS', 'authorizationService',
        'messageService' ,'REASON_FOR_NOT_WORKING'
    ];

    function CceInventoryListController(inventoryItems, $state, FUNCTIONAL_STATUS, CCE_RIGHTS,
                                        authorizationService, messageService, REASON_FOR_NOT_WORKING) {
        var vm = this;

        vm.$onInit = onInit;
        vm.getFunctionalStatusClass = getFunctionalStatusClass;
        vm.getStatusLabel = getStatusLabel;
        vm.goToStatusUpdate = goToStatusUpdate;
        vm.getReasonLabel = getReasonLabel;
        vm.hasEditRightToEdit = hasEditRightToEdit;

        /**
         * @ngdoc property
         * @propertyOf cce-inventory-list.controller:CceInventoryListController
         * @name inventoryItems
         * @type {Array}
         *
         * @description
         * Init method for CceInventoryListController.
         */
        vm.inventoryItems = undefined;

        /**
         * @ngdoc property
         * @propertyOf cce-inventory-list.controller:CceInventoryListController
         * @name userHasRightToEdit
         * @type {Boolean}
         *
         * @description
         * Flag defining whether user has right for editing the list of inventory items.
         */
        vm.userHasRightToEdit = undefined;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CceInventoryListController
         * @name onInit
         *
         * @description
         * Init method for CceInventoryListController.
         */
        function onInit() {
            vm.inventoryItems = inventoryItems;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CceInventoryListController
         * @name onInit
         *
         * @description
         * Init method for CceInventoryListController.
         *
         * @param  {String} status functional status name
         * @return {String}        functional status class for circle
         */
        function getFunctionalStatusClass(status) {
            var statusClass;

            switch (status) {
                case FUNCTIONAL_STATUS.FUNCTIONING:
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

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CceInventoryListController
         * @name getStatusLabel
         *
         * @description
         * Return localized label for the functional status.
         *
         * @param   {String}    status  the status to get the label for
         * @return  {String}            the localized status label
         */
        function getStatusLabel(status) {
            return messageService.get(FUNCTIONAL_STATUS.getLabel(status));
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CceInventoryListController
         * @name getReasonLabel
         *
         * @description
         * Return localized label for the reason.
         *
         * @param   {String}    reason  the reason to get the label for
         * @return  {String}            the localized reason label
         */
        function getReasonLabel(reason) {
            if (!reason) {
                return "";
            }
            return messageService.get(REASON_FOR_NOT_WORKING.getLabel(reason));
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CceInventoryListController
         * @name hasEditRightForProgram
         *
         * @description
         * Returns true whether user has right for editing the list of inventory items,
         * otherwise it returns false.
         *
         * @param  {String} programId   the UUID of inventory's program
         * @param  {String} facilityId  the UUID of inventory's facility
         * @return {Boolean}            true if user has permission to edit inventory item
         */
        function hasEditRightToEdit(programId, facilityId) {
            return authorizationService.hasRight(CCE_RIGHTS.CCE_INVENTORY_EDIT, {
                programId: programId,
                facilityId: facilityId
            });
        }

        function goToStatusUpdate(inventoryItem) {
            $state.go('openlmis.cce.inventory.statusUpdate', {
                inventoryItem: inventoryItem,
                inventoryItemId: inventoryItem.id
            });
        }
    }

})();
