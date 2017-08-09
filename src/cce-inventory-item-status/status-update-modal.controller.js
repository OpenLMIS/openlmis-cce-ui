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
        'inventoryItem', 'FUNCTIONAL_STATUS', 'messageService', 'REASON_FOR_NOT_WORKING',
        'modalDeferred', 'inventoryItemService', '$state', 'loadingModalService'
    ];

    function StatusUpdateModalController(inventoryItem, FUNCTIONAL_STATUS, messageService,
                                            REASON_FOR_NOT_WORKING, modalDeferred,
                                            inventoryItemService, $state, loadingModalService) {
        var vm = this;

        vm.$onInit = onInit;
        vm.getStatusLabel = getStatusLabel;
        vm.getReasonLabel = getReasonLabel;
        vm.getFunctionalStatusClass = FUNCTIONAL_STATUS.getClass;
        vm.isFunctioning = isFunctioning;
        vm.save = save;

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
         * @methodOf cce-equipment-status.controller:EquipmentStatusController
         * @name save
         *
         * @description
         * Updates the status of the given inventory item and saves it on the server.
         */
        function save() {
            loadingModalService.open();

            var item = angular.copy(vm.inventoryItem);

            item.functionalStatus = vm.newStatus;
            item.reasonNotWorkingOrNotInUse = isFunctioning(vm.newStatus) ? undefined : vm.reason;
            item.yearOfDecommission = isObsolete(vm.newStatus) ? vm.yearOfDecommission : undefined;

            inventoryItemService.save(item).then(function() {
                $state.go('openlmis.cce.inventory');
            }).finally(loadingModalService.close);
        }

        function isObsolete(status) {
            return status === FUNCTIONAL_STATUS.OBSOLETE;
        }
    }

})();
