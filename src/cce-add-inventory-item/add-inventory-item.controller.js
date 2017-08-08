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
     * @name cce-add-inventory-item.controller:AddInventoryItemController
     *
     * @description
     * Manages Add Inventory Item modal.
     */
    angular
        .module('cce-add-inventory-item')
        .controller('AddInventoryItemController', controller);

    controller.$inject = ['$state', 'types', 'catalogItems', '$scope', 'confirmService'];

    function controller($state, types, catalogItems, $scope, confirmService) {
        var vm = this;

        vm.$onInit = onInit;
        vm.addInventoryItem = addInventoryItem;
        vm.clearMakeModelSelection = clearMakeModelSelection;
        vm.goBack = goBack;

        /**
         * @ngdoc property
         * @propertyOf cce-add-inventory-item.controller:AddInventoryItemController
         * @type {Array}
         * @name types
         *
         * @description
         * The list of available equipment types.
         */
        vm.types = undefined;

        /**
         * @ngdoc property
         * @propertyOf cce-add-inventory-item.controller:AddInventoryItemController
         * @type {Array}
         * @name catalogItems
         *
         * @description
         * The list of available catalog items;
         */
        vm.catalogItems = undefined;

        /**
         * @ngdoc method
         * @methodOf cce-add-inventory-item.controller:AddInventoryItemController
         * @name $onInit
         *
         * @description
         * Initialization method of the AddInventoryItemController.
         */
        function onInit() {
            vm.types = types;
            vm.catalogItems = catalogItems;
        }

        /**
         * @ngdoc method
         * @methodOf cce-add-inventory-item.controller:AddInventoryItemController
         * @name addInventoryItem
         *
         * @description
         * Redirects the user to the edit modal.
         */
        function addInventoryItem() {
            $state.go('openlmis.cce.inventory.edit', {
                inventoryItem: angular.toJson({
                    facility: vm.facility,
                    program: vm.program,
                    catalogItem: vm.catalogItem
                })
            });
        }

        function clearMakeModelSelection() {
            vm.catalogItem = undefined;
        }

        function goBack() {
            if ($scope.addInventoryItemForm.$dirty) {
                confirmService.confirm(
                    'cceAddInventoryItem.closeAddInventoryItemModal',
                    'cceAddInventoryItem.yes',
                    'cceAddInventoryItem.no'
                ).then(function() {
                    $state.go('openlmis.cce.inventory');
                });
            } else {
                $state.go('openlmis.cce.inventory');
            }
        }

    }

})();
