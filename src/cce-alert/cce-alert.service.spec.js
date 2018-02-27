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

describe('cceAlertService', function() {

    var $rootScope, $httpBackend;
    var cceUrlFactory, cceAlertService, CCEAlertDataBuilder;
    var cceAlerts, cceAlert;

    beforeEach(function() {
        module('cce-alert');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            cceUrlFactory = $injector.get('cceUrlFactory');
            cceAlertService = $injector.get('cceAlertService');
            CCEAlertDataBuilder = $injector.get('CCEAlertDataBuilder');
        });

        prepareTestData();
    });

    describe('query', function() {

        var parameters = {
            page: 0,
            size: 10
        };

        beforeEach(function() {
            $httpBackend.when('GET', cceUrlFactory('/api/cceAlerts?page=' + parameters.page +
                '&size=' + parameters.size)).respond(200, {
                content: cceAlerts
            });
        });

        it('should return promise', function() {
            var result = cceAlertService.query(parameters);
            $httpBackend.flush();

            expect(result.then).not.toBeUndefined();
        });

        it('should resolve to CCE alerts', function() {
            var result;

            cceAlertService.query(parameters).then(function(data) {
                result = data;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            var expected = angular.copy(cceAlerts);
            expect(angular.toJson(result)).toEqual(angular.toJson({
                content: expected
            }));
        });

        it('should make a proper request', function() {
            $httpBackend.expect('GET', cceUrlFactory('/api/cceAlerts?page=' + parameters.page +
                '&size=' + parameters.size));

            cceAlertService.query(parameters);
            $httpBackend.flush();
        });
    });

    describe('save', function() {

        var result;

        beforeEach(function() {
            result = undefined;
        });

        it('should save CCE alert', function() {
            cceAlert = new CCEAlertDataBuilder().build();

            var returned = angular.copy(cceAlert);

            $httpBackend.expect(
                'PUT', cceUrlFactory('/api/cceAlerts'), cceAlert
            ).respond(200, returned);

            cceAlertService.save(cceAlert).then(function(cceAlert) {
                result = cceAlert;
            });

            $httpBackend.flush();
            $rootScope.$apply();

            expect(angular.toJson(result)).toEqual(angular.toJson(returned));
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    function prepareTestData() {
        cceAlerts = [
            new CCEAlertDataBuilder().withAlertId('1').build(),
            new CCEAlertDataBuilder().withAlertId('2').build()
        ];
    }
});
