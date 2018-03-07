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

    factory.$inject = ['$q', 'CCEAlertRepository', 'CCEAlertRepositoryImpl'];

    function factory($q, CCEAlertRepository, CCEAlertRepositoryImpl) {

        var repository = new CCEAlertRepository(new CCEAlertRepositoryImpl());

        return {
            getAlertsGroupedByDevice: getAlertsGroupedByDevice,
            saveAlert: saveAlert
        };

        /**
         * @ngdoc method
         * @methodOf cce-alert.cceAlertFactory
         * @name getAlertsGroupedByDevice
         *
         * @description
         * Returns all alerts, active or inactive. Map entry exists if there are any alerts.
         *
         * @param  {Object}     params Pagination parameters, device ID and active
         * @return {Promise}    the alerts
         */
        function getAlertsGroupedByDevice(params) {
            return repository.query(params)
                .then(function(response) {
                    var cceAlertsMap = response.content.reduce(function (map, obj) {
                        //this is necessary because it is unclear how to do Angular interpolation
                        //with object bracket notation with quotes
                        replaceKeysFromHyphenToUnderscore(obj.status);

                        if (!map[obj.device_id]) {
                            map[obj.device_id] = {
                                activeAlerts: [],
                                inactiveAlerts: []
                            };
                        }

                        if (!obj.end_ts && !obj.dismissed) {
                            map[obj.device_id].activeAlerts.push(obj);
                        } else {
                            map[obj.device_id].inactiveAlerts.push(obj);
                        }

                        return map;
                    }, {});

                    return cceAlertsMap;
                });
        }

        /**
         * @ngdoc method
         * @methodOf cce-alert.cceAlertFactory
         * @name saveAlert
         *
         * @description
         * Save the alert provided.
         *
         * @param  {Object}     alert the alert to save
         * @return {Promise}    the saved alert
         */
        function saveAlert(alert) {
            return repository.save(alert);
        }

        function replaceKeysFromHyphenToUnderscore(obj) {
            var oldKeys = Object.keys(obj);
            for (var j=0; j<oldKeys.length; j++) {
               var newKey = oldKeys[j].replace(/-/, "_");
               if (newKey !== oldKeys[j]) {
                   obj[newKey] = obj[oldKeys[j]];
                   delete obj[oldKeys[j]];
               }
            }
        }

    }
})();
