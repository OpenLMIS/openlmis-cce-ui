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
     * @name cce-inventory-item.CCE_STATUS
     *
     * @description
     * Stores the list of all available statuses and a method to get their labels.
     */
    angular
        .module('cce-inventory-item')
        .constant('CCE_STATUS', CCE_STATUS());

    function CCE_STATUS() {
        var CCE_STATUS = {
                YES: 'YES',
                NO: 'NO',
                UNKNOWN: 'UNKNOWN',
                NOT_APPLICABLE: 'NOT_APPLICABLE',
                getLabel: getLabel,
                getStatuses: getStatuses
            },
            labels = {
                YES: 'cceInventoryItem.yes',
                NO: 'cceInventoryItem.no',
                UNKNOWN: 'cceInventoryItem.unknown',
                NOT_APPLICABLE: 'cceInventoryItem.notApplicable'
            };

        return CCE_STATUS;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.CCE_STATUS
         * @name getLabel
         *
         * @description
         * Returns a label for the given status. Throws an exception if the status is not
         * recognized.
         *
         * @param   {String}    source  the energy source
         * @return  {String}            the label
         */
        function getLabel(source) {
            var label = labels[source];

            if (!label) {
                throw '"' + source + '" is not a valid status';
            }

            return label;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.CCE_STATUS
         * @name getStatuses
         *
         * @description
         * Returns all available statuses as a list.
         *
         * @return  {Array} the list of available statuses
         */
        function getStatuses() {
            return [
                CCE_STATUS.YES,
                CCE_STATUS.NO,
                CCE_STATUS.UNKNOWN,
                CCE_STATUS.NOT_APPLICABLE
            ];
        }


    }

})();
