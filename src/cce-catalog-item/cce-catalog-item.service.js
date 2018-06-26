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
     * @name cce-catalog-item.catalogItemService
     *
     * @description
     * Responsible for retrieving CCE catalog items from the server.
     */
    angular
        .module('cce-catalog-item')
        .factory('catalogItemService', service);

    service.$inject = ['cceUrlFactory', '$resource', 'FormData'];

    function service(cceUrlFactory, $resource, FormData) {

        var resource = $resource(cceUrlFactory('/api/catalogItems/:id'), {}, {
                'upload': {
                    url: cceUrlFactory('/api/catalogItems?format=csv'),
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    }
                },
                'search': {
                    url: cceUrlFactory('/api/catalogItems'),
                    method: 'GET'
                }
            });

        return {
            get: get,
            upload: upload,
            search: search,
            getAll: getAll,
            getDownloadUrl: getDownloadUrl
        };

        /**
         * @ngdoc method
         * @methodOf cce-catalog-item.catalogItemService
         * @name get
         *
         * @description
         * Gets CCE catalog item by id.
         *
         * @param  {String}  id CCE catalog item UUID
         * @return {Promise}    CCE catalog item info
         */
        function get(id) {
            return resource.get({
                id: id
            }).$promise;
        }

        /**
         * @ngdoc method
         * @methodOf cce-catalog-item.catalogItemService
         * @name getAll
         *
         * @description
         * Gets all CCE catalog items.
         *
         * @return {Promise} Array of all CCE catalog items
         */
        function getAll() {
            return resource.getAll().$promise;
        }

        /**
         * @ngdoc method
         * @methodOf cce-catalog-item.catalogItemService
         * @name upload
         *
         * @description
         * Uploads CCE catalog item with csv file.
         *
         * @param  {Object}  file the csv file that will be uploaded
         * @return {Promise}      the uploaded CCE catalog item
         */
        function upload(file) {
            var formData = new FormData();
            formData.append('file', file);

            return resource.upload(formData).$promise;
        }

        /**
         * @ngdoc method
         * @methodOf cce-catalog-item.catalogItemService
         * @name getDownloadUrl
         *
         * @description
         * Returns URL for downloading catalog items in csv format file.
         *
         * @return {String} the URL for downloading catalog items
         */
        function getDownloadUrl() {
            return cceUrlFactory('/api/catalogItems?format=csv');
        }

        function search(archived, visibleInCatalog) {
            return resource.search({
                archived: archived,
                visibleInCatalog: visibleInCatalog
            }).$promise;
        }
    }
})();
