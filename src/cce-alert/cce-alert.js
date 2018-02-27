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
     * @name cce-alert.CCEAlert
     *
     * @description
     * Represents a single CCE alert.
     */
    angular
        .module('cce-alert')
        .factory('CCEAlert', CCEAlert);

    function CCEAlert() {

        return CCEAlert;

        /**
         * @ngdoc method
         * @methodOf cce-alert.CCEAlert
         * @name CCEAlert
         *
         * @description
         * Creates a new instance of the CCEAlert class.
         *
         * @param  {String}  alert_id   the UUID of the alert to be updated
         * @param  {String}  alert_type the type of the alert to be updated
         * @param  {String}  device_id  the UUID of the device associated with the alert to be updated
         * @param  {Number}  start_ts   the start timestamp of the alert to be updated
         * @param  {Object}  status     the status message object of the alert to be updated
         * @param  {Number}  end_ts     the end timestamp of the alert to be updated
         * @param  {Boolean} dismissed  true if the alert has been dismissed
         * @return {Object}             the alert with default options
         */
        function CCEAlert(alert_id, alert_type, device_id, start_ts, status, end_ts, dismissed) {
            this.alert_id = alert_id,
            this.alert_type = alert_type;
            this.device_id = device_id;
            this.start_ts = start_ts;
            this.status = status;
            this.end_ts = end_ts;
            this.dismissed = dismissed;
        }

    }

})();
