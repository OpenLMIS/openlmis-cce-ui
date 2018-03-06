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


    angular
        .module('cce-alert')
        .factory('CCEAlertDataBuilder', CCEAlertDataBuilder);

    CCEAlertDataBuilder.$inject = ['CCEAlert'];

    function CCEAlertDataBuilder(CCEAlert) {

        CCEAlertDataBuilder.prototype.build = build;
        CCEAlertDataBuilder.prototype.buildJson = buildJson;
        CCEAlertDataBuilder.prototype.withAlertId = withAlertId;
        CCEAlertDataBuilder.prototype.withAlertType = withAlertType;
        CCEAlertDataBuilder.prototype.withDeviceId = withDeviceId;
        CCEAlertDataBuilder.prototype.withStartTs = withStartTs;
        CCEAlertDataBuilder.prototype.withStatus = withStatus;
        CCEAlertDataBuilder.prototype.withEndTs = withEndTs;
        CCEAlertDataBuilder.prototype.withDismissed = withDismissed;

        return CCEAlertDataBuilder;

        function CCEAlertDataBuilder() {
            this.alert_id = 'alert-1';
            this.alert_type = 'warning_hot';
            this.device_id = 'device-1';
            this.start_ts = '2018-01-01T00:00:00Z';
            this.status = {
                'en-US': 'Status message'
            };
            this.end_ts = null;
            this.dismissed = false;
        }

        function withAlertId(newAlertId) {
            this.alert_id = newAlertId;
            return this;
        }

        function withAlertType(newAlertType) {
            this.alert_type = newAlertType;
            return this;
        }

        function withDeviceId(newDeviceId) {
            this.device_id = newDeviceId;
            return this;
        }

        function withStartTs(newStartTs) {
            this.start_ts = newStartTs;
            return this;
        }

        function withStatus(newStatus) {
            this.status = newStatus;
            return this;
        }

        function withEndTs(newEndTs) {
            this.end_ts = newEndTs;
            return this;
        }

        function withDismissed(newDismissed) {
            this.dismissed = newDismissed;
            return this;
        }

        function build() {
            return new CCEAlert(this.buildJson());
        }

        function buildJson() {
            return {
                alert_id: this.alert_id,
                alert_type: this.alert_type,
                device_id: this.device_id,
                start_ts: this.start_ts,
                status: this.status,
                end_ts: this.end_ts,
                dismissed: this.dismissed
            };
        }

    }

})();
