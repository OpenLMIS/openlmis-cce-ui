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
     * @name cce-catalog-item.ENERGY_SOURCE
     *
     * @description
     * Stores the list of all available energy sources and a method to get their labels.
     */
    angular
        .module('cce-catalog-item')
        .constant('ENERGY_SOURCE', ENERGY_SOURCE());

    ENERGY_SOURCE.$inject = [];

    function ENERGY_SOURCE() {
        var ENERGY_SOURCE = {
                ELECTRIC: 'ELECTRIC',
                SOLAR: 'SOLAR',
                GASOLINE: 'GASOLINE',
                NOT_APPLICABLE: 'NOT_APPLICABLE',
                getLabel: getLabel,
                getSources: getSources
            },
            labels = {
                ELECTRIC: 'cceCatalogItem.electric',
                SOLAR: 'cceCatalogItem.solar',
                GASOLINE: 'cceCatalogItem.gasoline',
                NOT_APPLICABLE: 'cceCatalogItem.notApplicable'
            };

        return ENERGY_SOURCE;

        /**
         * @ngdoc method
         * @methodOf cce-catalog-item.ENERGY_SOURCE
         * @name getLabel
         *
         * @description
         * Returns a label for the given source. Throws an exception if the source is not
         * recognized.
         *
         * @param   {String}    source  the energy source
         * @return  {String}            the label
         */
        function getLabel(source) {
            var label = labels[source];

            if (!label) {
                throw '"' + source + '" is not a valid source';
            }

            return label;
        }

        /**
         * @ngdoc method
         * @methodOf cce-catalog-item.ENERGY_SOURCE
         * @name getSources
         *
         * @description
         * Returns all available energy sources as a list.
         *
         * @return  {Array} the list of available energy sources
         */
        function getSources() {
            return [
                ENERGY_SOURCE.ELECTRIC,
                ENERGY_SOURCE.SOLAR,
                ENERGY_SOURCE.GASOLINE,
                ENERGY_SOURCE.NOT_APPLICABLE
            ];
        }


    }

})();
