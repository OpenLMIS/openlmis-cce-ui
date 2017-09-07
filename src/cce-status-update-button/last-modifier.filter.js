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
     * @name cce-status-update-button.filter:period
     *
     * @description
     *
     * @param   {Object}  inventoryItem the inventory item to display last modifier for
     * @return  {String}                the formated last modifier
     *
     * @example
     * We want to display a period inside of a table and we want to include the period name
     * ```
     * <td>{{somePeriod | period:true}}</td>
     * ```
     */
    angular
        .module('cce-status-update-button')
        .filter('period', periodFilter);

    periodFilter.$inject = ['$filter'];

    function periodFilter($filter) {
        return function(period) {
            var startDate = $filter('openlmisDate')(period.startDate),
                endDate = $filter('openlmisDate')(period.endDate),
                transformed = startDate + ' - ' + endDate;

            return includeName ? period.name + ' (' + transformed + ')' : transformed;
        }
    }

})();
