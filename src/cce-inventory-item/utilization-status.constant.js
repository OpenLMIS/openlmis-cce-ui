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
     * @ngdoc object
     * @name cce-inventory-item.UTILIZATION_STATUS
     *
     * @description
     * Stores the list of all available utilization statuses and a method to get their labels.
     */
    angular
        .module('cce-inventory-item')
        .constant('UTILIZATION_STATUS', UTILIZATION_STATUS());

    function UTILIZATION_STATUS() {
        var UTILIZATION_STATUS = {
                ACTIVE: 'ACTIVE',
                NOT_IN_USE: 'NOT_IN_USE',
                IN_STORE_FOR_ALLOCATION: 'IN_STORE_FOR_ALLOCATION',
                getLabel: getLabel,
                getStatuses: getStatuses
            },
            labels = {
                ACTIVE: 'cceInventoryItem.active',
                NOT_IN_USE: 'cceInventoryItem.notInUse',
                IN_STORE_FOR_ALLOCATION: 'cceInventoryItem.inStoreForAllocation'
            };

        return UTILIZATION_STATUS;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.UTILIZATION_STATUS
         * @name getLabel
         *
         * @description
         * Returns a label for the given status. Throws an exception if the status is not
         * recognized.
         *
         * @param   {String}    status  the energy status
         * @return  {String}            the label
         */
        function getLabel(status) {
            var label = labels[status];

            if (!label) {
                throw '"' + status + '" is not a valid status';
            }

            return label;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.UTILIZATION_STATUS
         * @name getStatuses
         *
         * @description
         * Returns all available statuses as a list.
         *
         * @return  {Array} the list of available statuses
         */
        function getStatuses() {
            return [
                UTILIZATION_STATUS.ACTIVE,
                UTILIZATION_STATUS.NOT_IN_USE,
                UTILIZATION_STATUS.IN_STORE_FOR_ALLOCATION
            ];
        }

    }

})();
