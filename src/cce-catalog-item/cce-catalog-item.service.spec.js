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
        module('cce-catalog-item', function($provide) {
            cceUrlFactory = jasmine.createSpy().andCallFake(function(value) {
                return value;
            });
            $provide.factory('cceUrlFactory', function() {
                return cceUrlFactory;
            });
        });

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            cceUrlFactory = $injector.get('cceUrlFactory');
            catalogItemService = $injector.get('catalogItemService');
        });

        catalogItems = [{
            id: '1'
        }, {
            id: '2'
        }];
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
            $httpBackend.when('POST', cceUrlFactory('/api/catalogItems/upload')).respond(200, {
                content: file
            });
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

    describe('search', function() {

        var response;

        beforeEach(function() {
            response = {
                content: catalogItems,
                last: true,
                totalElements: 0,
                totalPages: 0,
                sort: null,
                first: true,
                numberOfElements: 0,
                size: 2000,
                number: 0
            };
        });

        it('should include archived in the body', function() {
            $httpBackend.expect('POST', cceUrlFactory('/api/catalogItems/search', {
                archived: true
            })).respond(200, response);

            catalogItemService.search(true);
            $httpBackend.flush();
        });

        it('should include visibleInCatalog in the body', function() {
            $httpBackend.expect('POST', cceUrlFactory('/api/catalogItems/search', {
                visibleInCatalog: true
            })).respond(200, response);

            catalogItemService.search(undefined, true);
            $httpBackend.flush();
        });

        it('should return promise resolving to a list of catalog items', function() {
            var result;

            $httpBackend.when('POST', cceUrlFactory('/api/catalogItems/search', {
                archived: true,
                visibleInCatalog: true
            })).respond(200, response);

            catalogItemService.search(true, true).then(function(response) {
                result = response;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            expect(angular.toJson(result)).toEqual(angular.toJson(response));
        });

    });

    describe('getDownloadUrl', function() {

        it('should expose getDownloadUrl method', function() {
            expect(angular.isFunction(catalogItemService.getDownloadUrl)).toBe(true);
        });

        it('should call cceUrlFactory', function(){
            var result = catalogItemService.getDownloadUrl();

            expect(result).toEqual('/api/catalogItems?type=csv');
            expect(cceUrlFactory).toHaveBeenCalledWith('/api/catalogItems?type=csv');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });
});
