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
     * @name cce-alert.cceAlertFactory
     *
     * @description
     * Allows the user to retrieve alerts with additional info.
     */
    angular
        .module('cce-alert')
        .factory('cceAlertFactory', factory);

    factory.$inject = ['$q', 'cceAlertService'];

    function factory($q, cceAlertService) {

        return {
            query: query
        };

        /**
         * @ngdoc method
         * @methodOf cce-alert.cceAlertFactory
         * @name query
         *
         * @description
         * Returns active alerts. Map entry exists if there are any active alerts.
         *
         * @param  {Object}     params Pagination parameters, device ID and active
         * @return {Promise}    the active alerts
         */
        function query(params) {
            return cceAlertService.query(params)
                .then(function(response) {
                    var cceAlertsMap = response.content.reduce(function (map, obj) {
                        if (!map[obj.device_id]) {
                            map[obj.device_id] = [];
                        }

                        if (!obj.end_ts && !obj.dismissed) {
                            map[obj.device_id].push(obj);
                        }

                        return map;
                    }, {});

                    return cceAlertsMap;
                });
        }

    }
})();
