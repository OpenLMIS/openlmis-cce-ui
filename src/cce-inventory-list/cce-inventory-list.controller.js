/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2017-2024 VillageReach, Techie Planet Ltd
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
        'inventoryItems', '$state', '$stateParams', 'FUNCTIONAL_STATUS', 'CCE_RIGHTS', 'messageService',
        'REASON_FOR_NOT_WORKING', 'cceAlerts', 'canEdit', 'canTransfer', 'inventoryItemService'
    ];

    function CceInventoryListController(inventoryItems, $state, $stateParams, FUNCTIONAL_STATUS,
                                        CCE_RIGHTS, messageService, REASON_FOR_NOT_WORKING, cceAlerts, canEdit,
                                        canTransfer, inventoryItemService) {

        var vm = this;

        vm.$onInit = onInit;
        vm.getStatusLabel = getStatusLabel;
        vm.goToStatusUpdate = goToStatusUpdate;
        vm.getReasonLabel = getReasonLabel;
        vm.search = search;
        vm.getFunctionalStatusClass = FUNCTIONAL_STATUS.getClass;
        vm.getDownloadURL = getDownloadURL;

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
         * @ngdoc property
         * @propertyOf cce-inventory-list.controller:CceInventoryListController
         * @name facility
         * @type {string}
         *
         * @description
         * The facility that inventory items will be filtered by.
         */

        /**
         * @ngdoc property
         * @propertyOf cce-inventory-list.controller:CceInventoryListController
         * @name program
         * @type {string}
         *
         * @description
         * The program that inventory items will be filtered by.
         */

        /**
         * @ngdoc property
         * @propertyOf cce-inventory-list.controller:CceInventoryListController
         * @name isSupervised
         * @type {Boolean}
         *
         * @description
         * Holds currently selected facility selection type:
         *  false - my facility
         *  true - supervised facility
         */
        vm.isSupervised = undefined;

        /**
         * ngdoc property
         * @propertyOf cce-inventory-list.controller.CceInventoryListController
         * @name functionalStatus
         * @type {string}
         *
         * @description
         * The selected functional status.
         */
        vm.functionalStatus = undefined;

        /**
         * ngdoc property
         * @propertyOf cce-inventory-list.controller.CceInventoryListController
         * @name functionalStatuses
         * @type {Array}
         *
         * @description
         * The list of available functional statuses.
         */
        vm.functionalStatuses = undefined;

        /**
         * ngdoc property
         * @propertyOf cce-inventory-list.controller.CceInventoryListController
         * @name cceAlerts
         * @type {Object}
         *
         * @description
         * A map of all alerts for the inventory items.
         */
        vm.cceAlerts = undefined;

        /**
         * ngdoc property
         * @propertyOf cce-inventory-list.controller.CceInventoryListController
         * @name cceAlertDefaultLocale
         * @type {string}
         *
         * @description
         * The default locale for all CCE alerts. US English for first iteration.
         */
        vm.cceAlertDefaultLocale = undefined;

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
            vm.cceAlerts = cceAlerts;
            vm.functionalStatuses = FUNCTIONAL_STATUS.getStatuses();
            vm.functionalStatus = $stateParams.functionalStatus;
            vm.userHasRightToEdit = canEdit;
            vm.userHasRightToTransfer = canTransfer;
            vm.isSupervised = $stateParams.supervised;
            vm.cceAlertDefaultLocale = 'en-US';
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CceInventoryListController
         * @name getStatusLabel
         *
         * @description
         * Return localized label for the functional status.
         *
         * @param   {string}    status  the status to get the label for
         * @return  {string}            the localized status label
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
         * @param   {string}    reason  the reason to get the label for
         * @return  {string}            the localized reason label
         */
        function getReasonLabel(reason) {
            if (!reason) {
                return '';
            }
            return messageService.get(REASON_FOR_NOT_WORKING.getLabel(reason));
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CceInventoryListController
         * @name goToStatusUpdate
         *
         * @description
         * Redirects user to inventory item status update modal screen.
         *
         * @param {InventoryItem} inventoryItem the inventory item which status will be updated
         */
        function goToStatusUpdate(inventoryItem) {
            $state.go('openlmis.cce.inventory.item.statusUpdate', {
                inventoryItem: inventoryItem,
                inventoryItemId: inventoryItem.id
            });
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CceInventoryListController
         * @name search
         *
         * @description
         * Reloads page with the new search parameters.
         */
        function search() {
            var stateParams = angular.copy($stateParams);

            delete stateParams.facilityId;
            delete stateParams.programId;

            stateParams.facility = vm.facility.id;
            stateParams.program = vm.program.id;
            stateParams.functionalStatus = vm.functionalStatus;
            stateParams.supervised = vm.isSupervised;

            $state.go('openlmis.cce.inventory', stateParams, {
                reload: true
            });
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CceInventoryListController
         * @name getDownloadURL
         *
         * @description
         * Downloads the facility Inventory data as a csv.
         *
         * @return {String} url
         */
        function getDownloadURL() {
            return inventoryItemService.getDownloadURL({
                facilityId: vm.facility.id,
                programId: vm.program.id
            })
        }
        
    }

})();
