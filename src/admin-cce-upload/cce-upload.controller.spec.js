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

describe('CceUploadController', function () {

    var $q, $controller, $rootScope, catalogItemService, notificationService,
        vm, file;

    beforeEach(function() {
        module('admin-cce-upload');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            catalogItemService = $injector.get('catalogItemService');
            notificationService = $injector.get('notificationService');
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        });

        file = {
            fileName: 'file.csv',
            content: 'file-content'
        };

        vm = $controller('CceUploadController', {});
    });

    describe('init', function() {

        it('should expose upload method', function() {
            expect(angular.isFunction(vm.upload)).toBe(true);
        });
    });

    describe('upload', function() {

        var itemsCount,
            deferred;

        beforeEach(function() {
            itemsCount = 2;
            deferred = $q.defer();

            spyOn(catalogItemService, 'upload').andReturn(deferred.promise);
            spyOn(notificationService, 'success');
            spyOn(notificationService, 'error');
        });

        it('should call catalogItemService and show success notification', function() {
            vm.file = file;
            deferred.resolve(itemsCount);

            vm.upload();
            $rootScope.$apply();

            expect(catalogItemService.upload).toHaveBeenCalledWith(file);
            expect(notificationService.success).toHaveBeenCalledWith('adminCceUpload.uploadSuccess');
        });

        it('should show error notification if upload failed', function() {
            vm.file = file;
            deferred.reject();

            vm.upload();
            $rootScope.$apply();

            expect(catalogItemService.upload).toHaveBeenCalledWith(file);
            expect(notificationService.error).toHaveBeenCalledWith('adminCceUpload.uploadFailed');
        });

        it('should show error notification if file is not selected', function() {
            vm.upload();

            expect(notificationService.error).toHaveBeenCalledWith('adminCceUpload.fileIsNotSelected');
            expect(catalogItemService.upload).not.toHaveBeenCalled();
        });
    });
});
