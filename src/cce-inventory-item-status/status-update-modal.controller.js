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
     * @name cce-inventory-item-status.controller:StatusUpdateModalController
     *
     * @description
     * Responsible for managing equipment status modal.
     */
    angular
        .module('cce-inventory-item-status')
        .controller('StatusUpdateModalController', StatusUpdateModalController);

    StatusUpdateModalController.$inject = [
        '$scope', 'inventoryItem', 'canEdit', 'FUNCTIONAL_STATUS', 'messageService', 'REASON_FOR_NOT_WORKING',
        'inventoryItemService', '$state', 'loadingModalService', 'confirmService',
        'notificationService', 'stateTrackerService', 'cceActiveAlerts'
    ];

    function StatusUpdateModalController($scope, inventoryItem, canEdit, FUNCTIONAL_STATUS, messageService,
                                         REASON_FOR_NOT_WORKING, inventoryItemService, $state,
                                         loadingModalService, confirmService, notificationService,
                                         stateTrackerService, cceActiveAlerts) {
        var vm = this;

        vm.save = save;
        vm.$onInit = onInit;
        vm.isObsolete = isObsolete;
        vm.isFunctioning = isFunctioning;
        vm.getStatusLabel = getStatusLabel;
        vm.getReasonLabel = getReasonLabel;
        vm.cancel = cancel;
        vm.getFunctionalStatusClass = FUNCTIONAL_STATUS.getClass;
        vm.clearReasonAndDecommissionDate = clearReasonAndDecommissionDated;
        vm.toIsoDate = toIsoDate;

        /**
         * @ngdoc property
         * @propertyOf cce-inventory-item-status.controller:StatusUpdateModalController
         * @name userHasRightToEdit
         * @type {Boolean}
         *
         * @description
         * Flag defining whether user has right for editing the inventory item.
         */
        vm.userHasRightToEdit = undefined;

        /**
         * ngdoc property
         * @propertyOf cce-inventory-list.controller.CceInventoryListController
         * @name cceActiveAlerts
         * @type {Object}
         *
         * @description
         * A map of all active alerts for the inventory item.
         */
         vm.cceActiveAlerts = undefined;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-status.controller:StatusUpdateModalController
         * @name $onInit
         *
         * @description
         * Initialization method of the StatusUpdateModalController.
         */
        function onInit() {
            vm.inventoryItem = angular.copy(inventoryItem);
            vm.newStatus = inventoryItem.functionalStatus;
            vm.reason = inventoryItem.reasonNotWorkingOrNotInUse;
            vm.statuses = FUNCTIONAL_STATUS.getStatuses();
            vm.reasons = REASON_FOR_NOT_WORKING.getReasons();
            vm.decommissionDate = inventoryItem.decommissionDate;
            vm.userHasRightToEdit = canEdit;
            vm.cceActiveAlerts = cceActiveAlerts;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-status.controller:StatusUpdateModalController
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
         * @methodOf cce-inventory-item-status.controller:StatusUpdateModalController
         * @name getReasonLabel
         *
         * @description
         * Return localized label for the reason.
         *
         * @param   {String}    reason  the reason to get the label for
         * @return  {String}            the localized reason label
         */
        function getReasonLabel(reason) {
            return messageService.get(REASON_FOR_NOT_WORKING.getLabel(reason));
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.controller:CceInventoryListController
         * @name toIsoDate
         *
         * @description
         * Convert epoch in milliseconds to ISO-8601 formatted date.
         *
         * @param  {Number} epochMilli epoch in milliseconds
         * @return {String}            ISO-8601 formatted date
         */
        function toIsoDate(epochMilli) {
            return new Date(epochMilli).toISOString();
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-status.controller:StatusUpdateModalController
         * @name isFunctioning
         *
         * @description
         * Checks whether the given status is functioning.
         *
         * @param   {String}    status  the status to be checked
         * @return  {Boolean}           true if the status is functioning, false otherwise
         */
        function isFunctioning(status) {
            return status === FUNCTIONAL_STATUS.FUNCTIONING;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-status.controller:StatusUpdateModalController
         * @name isObsolete
         *
         * @description
         *
         * @param   {String}    status  the status to be checked
         * @return  {Boolean}           true if the status is obsolete, false otherwise
         */
        function isObsolete(status) {
            return status === FUNCTIONAL_STATUS.OBSOLETE;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-status.controller:StatusUpdateModalController
         * @name save
         *
         * @description
         * Updates the status of the given inventory item and saves it on the server.
         */
        function save() {
            var loadingPromise = loadingModalService.open();

            var item = angular.copy(vm.inventoryItem);

            item.functionalStatus = vm.newStatus;
            item.reasonNotWorkingOrNotInUse = isFunctioning(vm.newStatus) ? undefined : vm.reason;
            item.decommissionDate = isObsolete(vm.newStatus) ? vm.decommissionDate : undefined;

            inventoryItemService.save(item).then(function(inventoryItem) {
                loadingPromise.then(function() {
                    notificationService.success('cceInventoryItemStatus.inventoryItemSaved');
                });
                stateTrackerService.goToPreviousState('openlmis.cce.inventory', {
                    inventoryItem: inventoryItem,
                    inventoryItemId: inventoryItem.id
                });
            }, loadingModalService.close);
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-status.controller:StatusUpdateModalController
         * @name clearReasonAndDecommissionDated
         *
         * @description
         * Clears the selected reason.
         */
        function clearReasonAndDecommissionDated() {
            vm.reason = undefined;
            vm.decommissionDate = undefined;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-status.controller:StatusUpdateModalController
         * @name cancel
         *
         * @description
         * Takes the user to the inventory item list screen. Will open a confirmation modal if user
         * interacted with the form.
         */
        function cancel() {
            if ($scope.statusUpdateForm.$dirty) {
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
            stateTrackerService.goToPreviousState('openlmis.cce.inventory', {
                inventoryItem: vm.inventoryItem,
                inventoryItemId: vm.inventoryItem.id
            });
        }
    }

})();
