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
     * @name cce-inventory-transfer-item.controller:TransferItemModalController
     *
     * @description
     * Responsible for managing equipment transfer modal.
     */
    angular
        .module('cce-inventory-transfer-item')
        .controller('TransferItemModalController', TransferItemModalController);

    TransferItemModalController.$inject = [
        '$scope', 'inventoryItem', 'canTransfer', 'inventoryItemService', 'loadingModalService',
        'confirmService', 'notificationService', 'stateTrackerService'
    ];

    function TransferItemModalController($scope, inventoryItem, canTransfer, inventoryItemService,
                                         loadingModalService, confirmService, notificationService,
                                         stateTrackerService) {
        var vm = this;

        vm.save = save;
        vm.$onInit = onInit;
        vm.cancel = cancel;

        /**
         * @ngdoc property
         * @propertyOf cce-inventory-transfer-item.controller:TransferItemModalController
         * @name userHasRightToTransfer
         * @type {Boolean}
         *
         * @description
         * Flag defining whether user has right for transfer the inventory item.
         */
        vm.userHasRightToTransfer = undefined;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-transfer-item.controller:TransferItemModalController
         * @name $onInit
         *
         * @description
         * Initialization method of the TransferItemModalController.
         */
        function onInit() {
            vm.inventoryItem = angular.copy(inventoryItem);
            vm.newFacility = inventoryItem.facility;
            vm.newProgram = inventoryItem.program;
            vm.newYearOfInstallation = inventoryItem.yearOfInstallation;
            vm.userHasRightToTransfer = canTransfer;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-transfer-item.controller:TransferItemModalController
         * @name save
         *
         * @description
         * Updates the facility, program and installation date of the given inventory item 
         * and saves it on the server.
         */
        function save() {
            var payload = {
                id: inventoryItem.id,
                facilityId: vm.newFacility.id,
                programId: vm.newProgram.id,
                yearOfInstallation: vm.newYearOfInstallation
            };

            loadingModalService.open();
            return inventoryItemService.transfer(payload)
                .then(function(inventoryItem) {
                    notificationService.success('Transfered CCE');
                    loadingModalService.close();
                    stateTrackerService.goToPreviousState();
                    return inventoryItem;
                })
                .catch(function() {
                    notificationService.error('Failed to transfer CCE');
                    loadingModalService.close();
                });
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-transfer-item.controller:TransferItemModalController
         * @name cancel
         *
         * @description
         * Takes the user to the inventory item list screen. Will open a confirmation modal if user
         * interacted with the form.
         */
        function cancel() {
            if ($scope.transferItemForm.$dirty) {
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
