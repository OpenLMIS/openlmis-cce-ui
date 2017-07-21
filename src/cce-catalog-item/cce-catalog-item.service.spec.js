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

describe('catalogItemService', function() {

    var $rootScope, $httpBackend, cceUrlFactory, catalogItemService, catalogItems;

    beforeEach(function() {
        module('cce-catalog-item');

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            cceUrlFactory = $injector.get('cceUrlFactory');
            catalogItemService = $injector.get('catalogItemService');
        });

        catalogItems = [
            {
                id: '1'
            },
            {
                id: '2'
            }
        ];
    });

    describe('get', function() {

        beforeEach(function() {
            $httpBackend.when('GET', cceUrlFactory('/api/catalogItems/' + catalogItems[0].id)).respond(200, catalogItems[0]);
        });

        it('should return promise', function() {
            var result = catalogItemService.get(catalogItems[0].id);
            $httpBackend.flush();

            expect(result.then).not.toBeUndefined();
        });

        it('should resolve to catalog item', function() {
            var result;

            catalogItemService.get(catalogItems[0].id).then(function(data) {
                result = data;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            expect(angular.toJson(result)).toEqual(angular.toJson(catalogItems[0]));
        });

        it('should make a proper request', function() {
            $httpBackend.expect('GET', cceUrlFactory('/api/catalogItems/' + catalogItems[0].id));

            catalogItemService.get(catalogItems[0].id);
            $httpBackend.flush();
        });
    });

    describe('getAll', function() {

        beforeEach(function() {
            $httpBackend.when('GET', cceUrlFactory('/api/catalogItems')).respond(200, catalogItems);
        });

        it('should return promise', function() {
            var result = catalogItemService.getAll(catalogItems[0].id);
            $httpBackend.flush();

            expect(result.then).not.toBeUndefined();
        });

        it('should resolve to catalog items', function() {
            var result;

            catalogItemService.getAll().then(function(data) {
                result = data;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            expect(angular.toJson(result)).toEqual(angular.toJson(catalogItems));
        });

        it('should make a proper request', function() {
            $httpBackend.expect('GET', cceUrlFactory('/api/catalogItems'));

            catalogItemService.getAll(catalogItems[0].id);
            $httpBackend.flush();
        });
    });

    describe('upload', function() {

        var file;

        beforeEach(function() {
            file = 'file-content';
            $httpBackend.when('POST', cceUrlFactory('/api/catalogItems/upload')).respond(200, {content: file});
        });

        it('should return promise', function() {
            var result = catalogItemService.upload(file);
            $httpBackend.flush();

            expect(result.then).not.toBeUndefined();
        });

        it('should resolve to catalog items', function() {
            var result;

            catalogItemService.upload(file).then(function(data) {
                result = data;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            expect(angular.toJson(result.content)).toEqual(angular.toJson(file));
        });

        it('should make a proper request', function() {
            $httpBackend.expect('POST', cceUrlFactory('/api/catalogItems/upload'));

            catalogItemService.upload(file);
            $httpBackend.flush();
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });
});
