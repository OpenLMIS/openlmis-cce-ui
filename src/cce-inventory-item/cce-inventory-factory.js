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

    factory.$inject = ['$q', 'inventoryItemService', 'programService', 'facilityService'];

    function factory($q, inventoryItemService, programService, facilityService) {

        return {
            get: get,
            getAllWithFacilities: getAllWithFacilities
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
                if (inventoryItem.programId) {
                    $q.all([
                        programService.get(inventoryItem.programId),
                        facilityService.get(inventoryItem.facility.id)
                    ]).then(function(result) {
                        inventoryItem.program = result[0];
                        inventoryItem.facility = result[1];
                        deferred.resolve(inventoryItem);
                    }, function() {
                        deferred.resolve(inventoryItem);
                    });
                }
            }, deferred.reject);

            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.inventoryItemFactory
         * @name getAllWithFacilities
         *
         * @description
         * Returns inventory items with full facility object.
         *
         * @param  {Object}     params Pagination parameters
         * @return {Promise}    the inventory items with facility info
         */
        function getAllWithFacilities(params) {
            var deferred = $q.defer();

            inventoryItemService.getAll(params)
                .then(function(inventoryItems) {
                    var ids = inventoryItems.content.map(function (item) {
                        return item.facility.id;
                    });

                    facilityService.query({id: ids})
                        .then(function(facilities) {
                            facilities.forEach(function (facility) {
                                var items = inventoryItems.content.filter(function (item) {
                                    return item.facility.id === facility.id;
                                });
                                items.forEach(function (item) {
                                    item.facility = facility;
                                })
                            });
                            deferred.resolve(inventoryItems);
                        }, deferred.resolve(inventoryItems));
                }, deferred.reject);

            return deferred.promise;
        }

    }
})();
