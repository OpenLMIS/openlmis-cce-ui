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
     * @name cce-inventory-item.inventoryItemFactory
     *
     * @description
     * Allows the user to retrieve inventory items with additional info.
     */
    angular
        .module('cce-inventory-item')
        .factory('inventoryItemFactory', factory);

    factory.$inject = [
        '$q', 'inventoryItemService', 'programService', 'facilityService', 'InventoryItem', 'referencedataUserService'
    ];

    function factory($q, inventoryItemService, programService, facilityService, InventoryItem) {

        return {
            get: get
        };

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.inventoryItemFactory
         * @name get
         *
         * @description
         * Returns inventory item using given id parameter with additional program info.
         *
         * @param  {String}  inventoryItemId the UUID of wanted inventory item
         * @return {Promise}                 the inventory item with program info
         */
        function get(inventoryItemId) {
            var deferred = $q.defer();

            inventoryItemService.get(inventoryItemId).then(function(inventoryItem) {
                $q.all([
                    programService.get(inventoryItem.program.id),
                    facilityService.get(inventoryItem.facility.id)
                ]).then(function(result) {
                    deferred.resolve(new InventoryItem(inventoryItem, result[1], result[0]));
                }, function() {
                    deferred.resolve(inventoryItem);
                });
            }, deferred.reject);

            return deferred.promise;
        }

    }
})();
