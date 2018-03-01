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

describe('CCEAlertRepository', function() {

    var CCEAlertRepository, CCEAlertDataBuilder, CCEAlertRepository, json,
        CCEAlert, $q, $rootScope, implMock, PageDataBuilder, cceAlertRepository;

    beforeEach(function() {
        module('cce-alert');

        inject(function($injector) {
            $q = $injector.get('$q');
            CCEAlert = $injector.get('CCEAlert');
            $rootScope = $injector.get('$rootScope');
            CCEAlertRepository = $injector.get('CCEAlertRepository');
            CCEAlertDataBuilder = $injector.get('CCEAlertDataBuilder');
            PageDataBuilder = $injector.get('PageDataBuilder');
        });

        implMock = jasmine.createSpyObj('impl', ['query', 'save']);

        cceAlertRepository = new CCEAlertRepository(implMock);
        json = new CCEAlertDataBuilder().buildJson();
    });

    describe('query', function() {

        it('should return instance of CCEAlert class', function() {
            var params = {
                page: 0,
                size: 10
            }

            implMock.query.andReturn($q.resolve(new PageDataBuilder().withContent([json]).build()));

            var result;
            cceAlertRepository.query(params)
            .then(function(page) {
                result = page;
            });
            $rootScope.$apply();

            expect(result.content[0] instanceof CCEAlert).toBe(true);
            expect(result.content[0]).toEqual(new CCEAlert(json));
            expect(implMock.query).toHaveBeenCalledWith(params);
        });

        it('should reject if implementation rejects', function() {
            implMock.query.andReturn($q.reject());

            var rejected;
            cceAlertRepository.query()
            .catch(function() {
                rejected = true;
            });
            $rootScope.$apply();

            expect(rejected).toBe(true);
        });
    });

    describe('save', function() {

        it('should resolve to saved CCE alert', function() {
            cceAlert = new CCEAlert(json, CCEAlertRepository);

            implMock.save.andCallFake(function(cceAlert) {
                return $q.resolve(json);
            });

            var result;
            cceAlertRepository.save(cceAlert)
            .then(function(cceAlert) {
                result = cceAlert;
            });
            $rootScope.$apply();

            expect(result instanceof CCEAlert).toBe(true);
            expect(result.alert_id).toEqual(cceAlert.alert_id);
            expect(implMock.save).toHaveBeenCalledWith(cceAlert);
        });

        it('should reject if implementation rejects', function() {
            var cceAlert = new CCEAlertDataBuilder().build();
            implMock.save.andReturn($q.reject());

            var rejected;
            cceAlertRepository.save(cceAlert)
            .catch(function() {
                rejected = true;
            });
            $rootScope.$apply();

            expect(rejected).toBe(true);
        });

    });

});
