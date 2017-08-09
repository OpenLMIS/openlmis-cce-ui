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

(function(){

    'use strict';

    /**
     * @ngdoc service
     * @name cce-inventory-item.inventoryItemService
     *
     * @description
     * Responsible for retrieving CCE inventory items from the server.
     */
    angular
        .module('cce-inventory-item')
        .factory('inventoryItemService', service);

    service.$inject = ['cceUrlFactory', '$resource'];

    function service(cceUrlFactory, $resource) {

        var resource = $resource(cceUrlFactory('/api/inventoryItems/:id'), {}, {
                'getAll': {
                    url: cceUrlFactory('/api/inventoryItems'),
                    method: 'GET'
                },
                save: {
                    method: 'POST'
                }
            });

        return {
            get: get,
            getAll: getAll,
            save: save
        };

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.inventoryItemService
         * @name get
         *
         * @description
         * Gets CCE inventory item by id.
         *
         * @param  {String}  id CCE inventory item UUID
         * @return {Promise}    CCE inventory item info
         */
        function get(id) {
            return resource.get({
                id: id
            }).$promise;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.inventoryItemService
         * @name getAll
         *
         * @description
         * Gets all CCE inventory items.
         *
         * @param  {Object} params Pagination parameters
         * @return {Promise}       Page of all CCE inventory items
         */
        function getAll(params) {
            return resource.getAll(params).$promise;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.inventoryItemService
         * @name update
         *
         * @description
         * Updates the given inventory item on the OpenLMIS server.
         *
         * @param  {Object}     inventoryItem   the updated inventory item
         * @return {Promise}                    the promise resolving to the updated item
         */
        function save(inventoryItem) {
            return resource.save({
                id: inventoryItem.id
            }, inventoryItem).$promise;
        }
    }
})();
