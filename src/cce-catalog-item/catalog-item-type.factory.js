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
     * @name cce-catalog-item.catalogItemTypeFactory
     *
     * @description
     * Provides a method for extracting a list of unique type from a list of catalog items.
     */
    angular
        .module('cce-catalog-item')
        .factory('catalogItemTypeFactory', factory);

    function factory() {
        var factory = {
            getTypes: getTypes
        };
        return factory;

        /**
         * @ngdoc method
         * @methodOf cce-catalog-item.catalogItemTypeFactory
         * @name getTypes
         *
         * @description
         * Extracts a list of unique types from a list of catalog items.
         *
         * @param  {Array}  catalogItems    the list of catalog items
         * @return {Array}                  the list of unique types
         */
        function getTypes(catalogItems) {
            if (!catalogItems) {
                throw 'The list of catalog items must be defined';
            }

            var types = [];

            angular.forEach(catalogItems, function(catalogItem) {
                if (types.indexOf(catalogItem.type) === -1) {
                    types.push(catalogItem.type);
                }
            });

            return types;
        }
    }

})();
