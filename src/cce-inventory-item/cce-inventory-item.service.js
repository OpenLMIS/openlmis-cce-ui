/*
 * This program is part of the OpenLMIS logistics management information system platform software.
 * Copyright © 2017-2024 VillageReach, Techie Planet Ltd
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
            get: {
                transformResponse: transformGetResponse
            },
            query: {
                method: 'GET',
                url: cceUrlFactory('/api/inventoryItems'),
                transformResponse: transformGetAllResponse
            },
            update: {
                method: 'PUT'
            },
            transfer: {
                method: 'PUT',
                url: cceUrlFactory('/api/inventoryItems/:id/transfer')
            }
        });

        return {
            get: get,
            query: query,
            save: save,
            transfer: transfer,
            getDownloadURL: getDownloadURL
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
         * @name query
         *
         * @description
         * Query CCE inventory items.
         *
         * @param  {Object} params query parameters
         * @return {Promise}       Page of all CCE inventory items
         */
        function query(params) {
            return resource.query(params).$promise;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.inventoryItemService
         * @name update
         *
         * @description
         * Saves the given inventory item. It will create a new one if the ID is not defined and
         * update the existing one otherwise.
         *
         * @param  {Object}     inventoryItem   the updated inventory item
         * @return {Promise}                    the promise resolving to the updated item
         */
        function save(inventoryItem) {
            if (inventoryItem.id) {
                return resource.update({
                    id: inventoryItem.id
                }, inventoryItem).$promise;
            }
            return resource.save({}, inventoryItem).$promise;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.inventoryItemService
         * @name transfer
         *
         * @description
         * Changes the Inventory facility, program and istallation date
         *
         * @param  {Object}     inventoryItem   the updated inventory item
         * @return {Promise}                    the promise resolving to the updated item
         */
        function transfer(inventoryItem) {
            if (inventoryItem.id) {
                return resource.transfer({
                    id: inventoryItem.id
                }, inventoryItem).$promise;
            }
            return resource.save({}, inventoryItem).$promise;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.inventoryItemService
         * @name getDownloadURL
         *
         * @description
         * Returns the download url for  the provided parameters
         *
         * @return {String}     the download url
         */
        function getDownloadURL(params) {
            return cceUrlFactory('/api/inventoryItems/download?format=csv&programId=' 
                + params.programId + '&facilityId=' + params.facilityId);
        }

        function transformGetResponse(data, headers, status) {
            return transformResponse(data, status, transformInventoryItem);
        }

        function transformGetAllResponse(data, headers, status) {
            return transformResponse(data, status, function(response) {
                angular.forEach(response.content, function(inventoryItem) {
                    transformInventoryItem(inventoryItem);
                });
                return response;
            });
        }

        function transformInventoryItem(inventoryItem) {
            inventoryItem.decommissionDate = new Date(inventoryItem.decommissionDate);
            return inventoryItem;
        }

        function transformResponse(data, status, transformer) {
            if (status === 200) {
                return transformer(angular.fromJson(data));
            }
            return data;
        }
    }
})();