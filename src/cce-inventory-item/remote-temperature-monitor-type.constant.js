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
     * @name cce-inventory-item.REMOTE_TEMPERATURE_MONITOR_TYPE
     *
     * @description
     * Stores the list of all available remote temperature monitor types and a method to get their
     * labels.
     */
    angular
        .module('cce-inventory-item')
        .constant('REMOTE_TEMPERATURE_MONITOR_TYPE', REMOTE_TEMPERATURE_MONITOR_TYPE());

    function REMOTE_TEMPERATURE_MONITOR_TYPE() {
        var REMOTE_TEMPERATURE_MONITOR_TYPE = {
                BUILD_IN: 'BUILD_IN',
                PAIRED: 'PAIRED',
                NO_RTM: 'NO_RTM',
                getLabel: getLabel,
                getTypes: getTypes
            },
            labels = {
                BUILD_IN: 'cceInventoryItem.builtIn',
                PAIRED: 'cceInventoryItem.paired',
                NO_RTM: 'cceInventoryItem.noRtm'
            };

        return REMOTE_TEMPERATURE_MONITOR_TYPE;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.REMOTE_TEMPERATURE_MONITOR_TYPE
         * @name getLabel
         *
         * @description
         * Returns a label for the given type. Throws an exception if the type is not recognized.
         *
         * @param   {String}    type  the energy type
         * @return  {String}            the label
         */
        function getLabel(type) {
            var label = labels[type];

            if (!label) {
                throw '"' + type + '" is not a valid status';
            }

            return label;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.REMOTE_TEMPERATURE_MONITOR_TYPE
         * @name getTypes
         *
         * @description
         * Returns all available types as a list.
         *
         * @return  {Array} the list of available types
         */
        function getTypes() {
            return [
                REMOTE_TEMPERATURE_MONITOR_TYPE.BUILD_IN,
                REMOTE_TEMPERATURE_MONITOR_TYPE.PAIRED,
                REMOTE_TEMPERATURE_MONITOR_TYPE.NO_RTM
            ];
        }


    }

})();
