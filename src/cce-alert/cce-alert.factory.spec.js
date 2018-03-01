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

    var $q, $rootScope, cceAlertFactory, CCEAlertRepository, cceAlertDeferred, cceAlerts, query,
        CCEAlertDataBuilder;

    beforeEach(function() {
        module('cce-alert', function($provide) {
            $provide.factory('CCEAlertRepository', function() {
                return function() {
                    repositoryMock = jasmine.createSpyObj('CCEAlertRepository', ['query']);
                    return repositoryMock;
                };
            });
        });

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
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
                .withAlertId("resolved-alert")
                .withDeviceId("device-1")
                .withEndTs(1)
                .withDismissed(false)
                .build(),
            new CCEAlertDataBuilder()
                .withAlertId("active-alert-2")
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
                .withDeviceId("device-3")
                .withEndTs(1)
                .withDismissed(true)
                .build()
        ];

        query = {
            page: 1,
            size: 10
        };

        cceAlertDeferred = $q.defer();
        repositoryMock.query.andReturn(cceAlertDeferred.promise);
    });

    describe('getAlertsGroupedByDevice', function() {

        it('should reject promise if alerts promise is rejected', function() {
            var status = undefined;

            cceAlertFactory.getAlertsGroupedByDevice(query).then(function() {
                status = 'resolved';
            }, function() {
                status = 'rejected';
            });

            cceAlertDeferred.reject();
            $rootScope.$apply();

            expect(repositoryMock.query).toHaveBeenCalledWith(query);
            expect(status).toEqual('rejected');
        });

        it('should resolve promise if alerts promise is resolved', function() {
            var status = undefined;

            cceAlertFactory.getAlertsGroupedByDevice(query).then(function(response) {
                status = 'resolved';
            }, function() {
                status = 'rejected';
            });

            cceAlertDeferred.resolve({content: cceAlerts});
            $rootScope.$apply();

            expect(repositoryMock.query).toHaveBeenCalledWith(query);
            expect(status).toEqual('resolved');
        });

        it('should resolve promise even if params is undefined', function() {
            var status = undefined;

            cceAlertFactory.getAlertsGroupedByDevice(undefined).then(function(response) {
                status = 'resolved';
            }, function() {
                status = 'rejected';
            });

            cceAlertDeferred.resolve({content: cceAlerts});
            $rootScope.$apply();

            expect(repositoryMock.query).toHaveBeenCalledWith(undefined);
            expect(status).toEqual('resolved');
        });

        it('should transform to map with device ID as key if promise is resolved', function() {
            var resultMap = {};

            cceAlertFactory.getAlertsGroupedByDevice(query).then(function(response) {
                resultMap = response;
            });

            cceAlertDeferred.resolve({content: cceAlerts});
            $rootScope.$apply();

            expect(resultMap['device-1']).toBeDefined();
            expect(resultMap['device-2']).toBeDefined();
        });

        it('should consolidate alerts from the same device, and separate into active and inactive, if promise is resolved', function() {
            var resultMap = {};

            cceAlertFactory.getAlertsGroupedByDevice(query).then(function(response) {
                resultMap = response;
            });

            cceAlertDeferred.resolve({content: cceAlerts});
            $rootScope.$apply();

            expect(resultMap['device-1']).toBeDefined();
            expect(resultMap['device-1'].activeAlerts.length).toBe(1);
            expect(resultMap['device-1'].activeAlerts[0].alert_id).toBe('active-alert-1');
            expect(resultMap['device-1'].inactiveAlerts.length).toBe(1);
            expect(resultMap['device-1'].inactiveAlerts[0].alert_id).toBe('resolved-alert');

            expect(resultMap['device-2']).toBeDefined();
            expect(resultMap['device-2'].activeAlerts.length).toBe(1);
            expect(resultMap['device-2'].activeAlerts[0].alert_id).toBe('active-alert-2');
            expect(resultMap['device-2'].inactiveAlerts.length).toBe(1);
            expect(resultMap['device-2'].inactiveAlerts[0].alert_id).toBe('dismissed-alert');

            expect(resultMap['device-3']).toBeDefined();
            expect(resultMap['device-3'].activeAlerts.length).toBe(0);
            expect(resultMap['device-3'].inactiveAlerts.length).toBe(1);
            expect(resultMap['device-3'].inactiveAlerts[0].alert_id).toBe('resolved-dismissed-alert');
        });
    });
});
