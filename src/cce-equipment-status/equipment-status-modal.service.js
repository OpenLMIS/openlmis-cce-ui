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
     * @ngdoc service
     * @name cce-equipment-status.equipmentStatusModalService
     *
     * @description
     * Responsible for managing equipment status modal.
     */
    angular
        .module('cce-equipment-status')
        .service('equipmentStatusModalService', equipmentStatusModalService);

    equipmentStatusModalService.$inject = ['openlmisModalService'];

    function equipmentStatusModalService(openlmisModalService) {
        var service = this;

        service.open = open;

        /**
         * @ngdoc method
         * @methodOf cce-equipment-status.equipmentStatusModalService
         * @name open
         *
         * @description
         * Opens modal responsible for updating inventory item status.
         *
         * @param   {Object}    item    the equipment item
         * @return  {Promise}           the promise resolving to a inventory item with updated
         *                              status
         */
        function open(item) {
            return openlmisModalService.createDialog({
                controller: 'EquipmentStatusModalController',
                controllerAs: 'vm',
                templateUrl: 'cce-equipment-status/equipment-status-modal.html',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            }).promise;
        }
    }

})();
