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
     * @name cce-status-update-button.controller:StatusUpdateButtonController
     *
     * @description
     * Provides methods for making status update button functional.
     */
    angular
        .module('cce-status-update-button')
        .controller('StatusUpdateButtonController', StatusUpdateButtonController);

    StatusUpdateButtonController.$inject = ['$scope', '$state', 'FUNCTIONAL_STATUS'];

    function StatusUpdateButtonController($scope, $state, FUNCTIONAL_STATUS) {
        var vm = this;

        vm.$onInit = onInit;
        vm.goToStatusUpdate = goToStatusUpdate;

        /**
         * @ngdoc method
         * @methodOf cce-status-update-button.controller:StatusUpdateButtonController
         * @name $onInit
         *
         * @description
         * Initialization method of the StatusUpdateButtonController.
         */
        function onInit() {
            vm.inventoryItem = $scope.inventoryItem;
            vm.getStatusLabel = FUNCTIONAL_STATUS.getLabel;
            vm.getStatusClass = FUNCTIONAL_STATUS.getClass;
        }

        /**
         * @ngdoc method
         * @methodOf cce-status-update-button.controller:StatusUpdateButtonController
         * @name goToStatusUpdate
         *
         * @description
         * Takes the user to the status update page for the given inventory item.
         *
         * @param   {Object}    inventoryItem   the inventory item to edit status for
         */
        function goToStatusUpdate(inventoryItem) {
            $state.go('openlmis.cce.inventory.statusUpdate', {
                inventoryItem: inventoryItem,
                inventoryItemId: inventoryItem.id
            });
        }

    }

})();
