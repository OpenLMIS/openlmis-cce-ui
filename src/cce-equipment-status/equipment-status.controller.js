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
     * @name cce-equipment-status.controller:EquipmentStatusController
     *
     * @description
     * Provides methods for equipment status directive.
     */
    angular
        .module('cce-equipment-status')
        .controller('EquipmentStatusController', EquipmentStatusController);

    EquipmentStatusController.$inject = [
        '$element', 'FUNCTIONAL_STATUS', 'equipmentStatusModalService', 'messageService',
        'inventoryItemService', 'loadingModalService'
    ];

    function EquipmentStatusController($element, FUNCTIONAL_STATUS, equipmentStatusModalService,
                                       messageService, inventoryItemService, loadingModalService) {
        var vm = this,
            ngModelCtrl = $element.controller('ngModel');

        vm.$onInit = onInit;
        vm.changeStatus = changeStatus;
        vm.getStatusLabel = getStatusLabel;
        vm.getFunctionalStatusClass = FUNCTIONAL_STATUS.getClass;

        /**
         * @ngdoc method
         * @methodOf cce-equipment-status.controller:EquipmentStatusController
         * @name $onInit
         *
         * @description
         * Initialization method of the EquipmentStatusController.
         */
        function onInit() {
            ngModelCtrl.$render = function() {
                vm.item = ngModelCtrl.$viewValue;
            };
        }

        /**
         * @ngdoc method
         * @methodOf cce-equipment-status.controller:EquipmentStatusController
         * @name changeStatus
         *
         * @description
         * Opens the equipment status modal allowing the user to update equipment functional status.
         */
        function changeStatus() {
            equipmentStatusModalService.open(vm.item).then(function(item) {
                loadingModalService.open();
                inventoryItemService.update(item).then(function() {
                    vm.item = item;
                    ngModelCtrl.$setViewValue(item);
                }).finally(loadingModalService.close);
            });
        }

        /**
         * @ngdoc method
         * @methodOf cce-equipment-status.controller:EquipmentStatusController
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
    }

})();
