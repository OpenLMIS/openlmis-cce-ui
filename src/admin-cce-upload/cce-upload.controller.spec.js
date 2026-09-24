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

describe('CceUploadController', function() {

    var $state, $q, $controller, $rootScope, catalogItemService, messageService, notificationService,
        loadingModalService, vm, file;

    beforeEach(function() {
        module('admin-cce-upload');

        inject(function($injector) {
            $controller = $injector.get('$controller');
            messageService = $injector.get('messageService');
            catalogItemService = $injector.get('catalogItemService');
            notificationService = $injector.get('notificationService');
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $state = $injector.get('$state');
            loadingModalService = $injector.get('loadingModalService');
        });

        file = {
            fileName: 'file.csv',
            content: 'file-content'
        };

        vm = $controller('CceUploadController', {});

        spyOn($state, 'reload').andReturn(true);
        spyOn(loadingModalService, 'open').andReturn($q.when());
        spyOn(loadingModalService, 'close');
    });

    describe('init', function() {

        it('should expose upload method', function() {
            expect(angular.isFunction(vm.upload)).toBe(true);
        });

        it('should expose getExportUrl method', function() {
            expect(angular.isFunction(vm.getExportUrl)).toBe(true);
        });
    });

    describe('upload', function() {

        var response,
            deferred;

        beforeEach(function() {
            response = {
                amount: 2
            };
            deferred = $q.defer();

            spyOn(catalogItemService, 'upload').andReturn(deferred.promise);
            spyOn(notificationService, 'success');
            spyOn(notificationService, 'error');
        });

        it('should call catalogItemService and show success notification', function() {
            var message = 'message';
            spyOn(messageService, 'get').andReturn(message);

            vm.file = file;
            deferred.resolve(response);

            vm.upload();
            $rootScope.$apply();

            expect(messageService.get).toHaveBeenCalledWith(
                'adminCceUpload.uploadSuccess', {
                    amount: response.amount
                }
            );

            expect(catalogItemService.upload).toHaveBeenCalledWith(file);
            expect(notificationService.success).toHaveBeenCalledWith(message);
            expect($state.reload).toHaveBeenCalled();
        });

        it('should show error notification if upload failed', function() {
            vm.file = file;
            deferred.reject({
                status: 400,
                data: {
                    message: 'Another CCE Catalog Item already uses this manufacturer and model.'
                }
            });

            vm.upload();
            $rootScope.$apply();

            expect(catalogItemService.upload).toHaveBeenCalledWith(file);
            expect(notificationService.error).toHaveBeenCalledWith('adminCceUpload.uploadFailed');
            expect(vm.invalidMessage)
                .toEqual('Another CCE Catalog Item already uses this manufacturer and model.');
        });

        it('should keep the chosen file after a failed upload', function() {
            vm.file = file;
            deferred.reject({
                status: 400,
                data: {
                    message: 'rejected'
                }
            });

            vm.upload();
            $rootScope.$apply();

            expect(vm.file).toBe(file);
        });

        it('should let the user retry after a failed upload', function() {
            vm.file = file;
            deferred.reject({
                status: 400,
                data: {
                    message: 'rejected'
                }
            });

            vm.upload();
            $rootScope.$apply();
            vm.upload();

            expect(catalogItemService.upload.callCount).toBe(2);
        });

        it('should not throw when the rejection carries no data', function() {
            vm.file = file;
            deferred.reject({
                status: -1,
                data: null
            });

            vm.upload();
            $rootScope.$apply();

            expect(vm.invalidMessage).toBeUndefined();
            expect(loadingModalService.close).toHaveBeenCalled();
        });

        it('should show error notification if file is not selected', function() {
            vm.upload();

            expect(notificationService.error).toHaveBeenCalledWith('adminCceUpload.fileIsNotSelected');
            expect(catalogItemService.upload).not.toHaveBeenCalled();
        });
    });

    describe('getExportUrl', function() {

        it('should call catalogItemService and return download url', function() {
            var downloadUrl = 'some-domain/download';
            spyOn(catalogItemService, 'getDownloadUrl').andReturn(downloadUrl);

            var result = vm.getExportUrl();

            expect(result).toEqual(downloadUrl);
            expect(catalogItemService.getDownloadUrl).toHaveBeenCalled();
        });
    });
});
