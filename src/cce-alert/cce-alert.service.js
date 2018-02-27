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
     * @name cce-alert.cceAlertService
     *
     * @description
     * Responsible for retrieving CCE alerts from the server.
     */
    angular
        .module('cce-alert')
        .factory('cceAlertService', service);

    service.$inject = ['cceUrlFactory', '$resource'];

    function service(cceUrlFactory, $resource) {

        var resource = $resource(cceUrlFactory('/api/cceAlerts'), {}, {
                query: {
                    isArray: false
                },
                update: {
                    method: 'PUT'
                }
            });

        return {
            query: query,
            save: save
        };

        /**
         * @ngdoc method
         * @methodOf cce-alert.cceAlertService
         * @name query
         *
         * @description
         * Query CCE alerts.
         *
         * @param  {Object}  params query parameters
         * @return {Promise}        Page of all CCE alerts
         */
        function query(params) {
            return resource.query(params).$promise;
        }

        /**
         * @ngdoc method
         * @methodOf cce-alert.cceAlertService
         * @name save
         *
         * @description
         * Saves the given alert. It will create a new one if the ID is not defined and
         * update the existing one otherwise.
         *
         * @param  {Object}     alert   the saved alert
         * @return {Promise}            the promise resolving to the saved item
         */
        function save(alert) {
            return resource.update({}, alert).$promise;
        }
    }
})();
