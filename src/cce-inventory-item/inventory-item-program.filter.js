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
     * @name cce-inventory-item.filter:inventoryItemProgram
     *
     * @description
     * Returns a program name for the given inventory item
     *
     * @param   {Object}  inventoryItem the inventory item
     * @return  {String}                the program name
     *
     * @example
     * We want to display a program name for the inventory item. All we have to do is this.
     * ```
     * <td>{{inventoryItem | inventoryItemProgram}}</td>
     * ```
     */
    angular
        .module('cce-inventory-item')
        .filter('inventoryItemProgram', inventoryItemProgramFilter);

    inventoryItemProgramFilter.$inject = ['$filter'];

    function inventoryItemProgramFilter($filter) {
        return function(inventoryItem) {
            var program = $filter('filter')(inventoryItem.facility.supportedPrograms, {
                id: inventoryItem.programId
            });

            if (!program.length) {
                throw 'Can\'t find program with ' + inventoryItem.programId;
            }

            return program[0].name;
        };
    }

})();