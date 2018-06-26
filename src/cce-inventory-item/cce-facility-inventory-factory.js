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
     * @name cce-inventory-item.facilityInventoryItemFactory
     *
     * @description
     * Allows the user to retrieve inventory items with additional info.
     */
    angular
        .module('cce-inventory-item')
        .factory('facilityInventoryItemFactory', factory);

    factory.$inject = ['$q', 'inventoryItemService', 'facilityService', 'InventoryItem'];

    function factory($q, inventoryItemService, facilityService, InventoryItem) {

        return {
            query: query
        };

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.facilityInventoryItemFactory
         * @name query
         *
         * @description
         * Returns inventory items with full facility object.
         *
         * @param  {Object}     params Pagination parameters
         * @return {Promise}    the inventory items with facility info
         */
        function query(params) {
            var inventoryItems,
                content;

            return inventoryItemService.query(params)
                .then(function(response) {
                    inventoryItems = response;
                    content = inventoryItems.content;
                    if (!content.length) {
                        return [];
                    }

                    var facilityIds = content.map(function (item) {
                        return item.facility.id;
                    });

                    return facilityService.query({
                        id: facilityIds
                    });
                })
                .then(function(response) {
                    for (var i = 0; i<content.length; i++) {
                        var facilities = response;
                        var facilitiesFiltered = facilities.filter(function (facility) {
                            return content[i].facility.id === facility.id;
                        });

                        content[i] = new InventoryItem(
                            content[i],
                            facilitiesFiltered[0]);
                    }
                    return inventoryItems;
                });
        }

    }
})();
