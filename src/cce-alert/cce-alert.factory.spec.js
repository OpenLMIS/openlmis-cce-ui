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

describe('cceAlertFactory', function() {

    var $q, $rootScope, cceAlertFactory, cceAlertService, cceAlertDeferred, cceAlerts, query,
        CCEAlertDataBuilder;

    beforeEach(function() {
        module('cce-alert');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            cceAlertService = $injector.get('cceAlertService');
            cceAlertFactory = $injector.get('cceAlertFactory');
            CCEAlertDataBuilder = $injector.get('CCEAlertDataBuilder');
        });

        cceAlerts = [
            new CCEAlertDataBuilder()
                .withAlertId("active-alert-1")
                .withDeviceId("device-1")
                .withEndTs(null)
                .withDismissed(false)
                .build(),
            new CCEAlertDataBuilder()
                .withAlertId("active-alert-2")
                .withDeviceId("device-1")
                .withEndTs(null)
                .withDismissed(false)
                .build(),
            new CCEAlertDataBuilder()
                .withAlertId("resolved-alert")
                .withDeviceId("device-1")
                .withEndTs(1)
                .withDismissed(false)
                .build(),
            new CCEAlertDataBuilder()
                .withAlertId("active-alert-3")
                .withDeviceId("device-2")
                .withEndTs(null)
                .withDismissed(false)
                .build(),
            new CCEAlertDataBuilder()
                .withAlertId("dismissed-alert")
                .withDeviceId("device-2")
                .withEndTs(null)
                .withDismissed(true)
                .build(),
            new CCEAlertDataBuilder()
                .withAlertId("resolved-dismissed-alert")
                .withDeviceId("device-2")
                .withEndTs(1)
                .withDismissed(true)
                .build()
        ];

        query = {
            page: 1,
            size: 10
        };

        cceAlertDeferred = $q.defer();
        spyOn(cceAlertService, 'query').andReturn(cceAlertDeferred.promise);
    });

    describe('getActiveAlertsGroupedByDevice', function() {

        it('should reject promise if alerts promise is rejected', function() {
            var status = undefined;

            cceAlertFactory.getActiveAlertsGroupedByDevice(query).then(function() {
                status = 'resolved';
            }, function() {
                status = 'rejected';
            });

            cceAlertDeferred.reject();
            $rootScope.$apply();

            expect(cceAlertService.query).toHaveBeenCalledWith(query);
            expect(status).toEqual('rejected');
        });

        it('should resolve promise if alerts promise is resolved', function() {
            var status = undefined;

            cceAlertFactory.getActiveAlertsGroupedByDevice(query).then(function(response) {
                status = 'resolved';
            }, function() {
                status = 'rejected';
            });

            cceAlertDeferred.resolve({content: cceAlerts});
            $rootScope.$apply();

            expect(cceAlertService.query).toHaveBeenCalledWith(query);
            expect(status).toEqual('resolved');
        });

        it('should resolve promise even if params is undefined', function() {
            var status = undefined;

            cceAlertFactory.getActiveAlertsGroupedByDevice(undefined).then(function(response) {
                status = 'resolved';
            }, function() {
                status = 'rejected';
            });

            cceAlertDeferred.resolve({content: cceAlerts});
            $rootScope.$apply();

            expect(cceAlertService.query).toHaveBeenCalledWith(undefined);
            expect(status).toEqual('resolved');
        });

        it('should transform to map with device ID as key if promise is resolved', function() {
            var resultMap = {};

            cceAlertFactory.getActiveAlertsGroupedByDevice(query).then(function(response) {
                resultMap = response;
            });

            cceAlertDeferred.resolve({content: cceAlerts});
            $rootScope.$apply();

            expect(resultMap['device-1']).toBeDefined();
            expect(resultMap['device-2']).toBeDefined();
        });

        it('should have only active alerts, and consolidate alerts from the same device, if promise is resolved', function() {
            var resultMap = {};

            cceAlertFactory.getActiveAlertsGroupedByDevice(query).then(function(response) {
                resultMap = response;
            });

            cceAlertDeferred.resolve({content: cceAlerts});
            $rootScope.$apply();

            expect(resultMap['device-1']).toBeDefined();
            expect(resultMap['device-1'].length).toBe(2);
            expect(resultMap['device-1'][0].alert_id).toContain('active-alert-');
            expect(resultMap['device-1'][1].alert_id).toContain('active-alert-');
            expect(resultMap['device-2']).toBeDefined();
            expect(resultMap['device-2'].length).toBe(1);
            expect(resultMap['device-2'][0].alert_id).toBe('active-alert-3');
        });
    });
});
