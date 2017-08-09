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
     * @ngdoc filter
     * @name cce-equipment-status.filter:makeModel
     *
     * @description
     * Parses the given catalog item to be displayed in the following format
     * {{catalogItem.manufacturer catalogItem.model}.
     *
     * @param   {Object}  catalogItem   the catalog item to be formated
     * @return  {String}                the formated catalog item
     *
     * @example
     * The following example shows how to format the catalog item.
     * ```
     * <td>{{catalogItem | makeModel}}</td>
     * ```
     */
    angular
        .module('cce-equipment-status')
        .filter('makeModel', filter);

    function filter() {
        return function(catalogItem) {
            return catalogItem.manufacturer + ' ' + catalogItem.model;
        };
    }

})();
