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
     * @name facility-cce-status.inventoryItemService
     *
     * @description
     * Responsible for retrieving CCE inventory items from the server.
     */
    angular
        .module('facility-cce-status')
        .config(provider);

    provider.$inject = ['$provide'];
    function provider($provide) {
        $provide.decorator('inventoryItemService', decorator);
    }

    decorator.$inject = ['$delegate'];
    function decorator($delegate) {
        $delegate.getAllForFacility = getAllForFacility;
        return $delegate;

        /**
         * @ngdoc method
         * @methodOf facility-cce-status.inventoryItemService
         * @name getAllForFacility
         *
         * @description
         * Returns all inventory items based on facility.
         *
         * @param   {String}    facilityId    facility id
         * @param   {Number}    pageNumber    first page number, default 0
         * @return  {Promise}                 promise with list of inventory items
         */
        function getAllForFacility(facilityId, pageNumber) {
            if (pageNumber === undefined) {
                pageNumber = 0;
            }
            var params = {
                page: pageNumber,
                facilityId: facilityId
            };
            return $delegate.query($delegate, params)
            .then(function (page) {
                if (!page.last) {
                    return getAllForFacility(facilityId, ++pageNumber)
                    .then(function (nextPageContent) {
                        return page.content.concat(nextPageContent);
                    });
                } else {
                    return page.content;
                }
            });
        }
    }
})();
