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
     * @name cce-inventory-item.MANUAL_TEMPERATURE_GAUGE_TYPE
     *
     * @description
     * Stores the list of all available temperature gauge types and a method to get their labels.
     */
    angular
        .module('cce-inventory-item')
        .constant('MANUAL_TEMPERATURE_GAUGE_TYPE', MANUAL_TEMPERATURE_GAUGE_TYPE());

    function MANUAL_TEMPERATURE_GAUGE_TYPE() {
        var MANUAL_TEMPERATURE_GAUGE_TYPE = {
                BUILT_IN: 'BUILT_IN',
                PAIRED: 'PAIRED',
                NO_GAUGE: 'NO_GAUGE',
                getLabel: getLabel,
                getTypes: getTypes
            },
            labels = {
                BUILT_IN: 'cceInventoryItem.builtIn',
                PAIRED: 'cceInventoryItem.paired',
                NO_GAUGE: 'cceInventoryItem.noGauge'
            };

        return MANUAL_TEMPERATURE_GAUGE_TYPE;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.MANUAL_TEMPERATURE_GAUGE_TYPE
         * @name getLabel
         *
         * @description
         * Returns a label for the given type. Throws an exception if the type is not recognized.
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
         * @methodOf cce-inventory-item.MANUAL_TEMPERATURE_GAUGE_TYPE
         * @name getTypes
         *
         * @description
         * Returns all available types as a list.
         *
         * @return  {Array} the list of available types
         */
        function getTypes() {
            return [
                MANUAL_TEMPERATURE_GAUGE_TYPE.BUILT_IN,
                MANUAL_TEMPERATURE_GAUGE_TYPE.PAIRED,
                MANUAL_TEMPERATURE_GAUGE_TYPE.NO_GAUGE
            ];
        }


    }

})();
