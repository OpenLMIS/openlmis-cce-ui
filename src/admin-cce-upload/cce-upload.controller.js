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
     * @ngdoc controller
     * @name admin-cce-upload.controller:CceUploadController
     *
     * @description
     * Controller for uploading CCE catalog item.
     */
    angular
        .module('admin-cce-upload')
        .controller('CceUploadController', controller);

    controller.$inject = ['$state', 'catalogItemService', 'notificationService', 'messageService', 'loadingModalService'];

    function controller($state, catalogItemService, notificationService, messageService, loadingModalService) {

        var vm = this;

        vm.getExportUrl = getExportUrl;
        vm.upload = upload;

        /**
         * @ngdoc property
         * @propertyOf admin-cce-upload.controller:CceUploadController
         * @name file
         * @type {Object}
         *
         * @description
         * Holds csv file.
         */
        vm.file = undefined;

        /**
         * @ngdoc property
         * @propertyOf admin-cce-upload.controller:CceUploadController
         * @name invalidMessage
         * @type {String}
         *
         * @description
         * Holds form error message.
         */
        vm.invalidMessage = undefined;

        /**
         * @ngdoc method
         * @methodOf admin-cce-upload.controller:CceUploadController
         * @name upload
         *
         * @description
         * Uploads csv file with catalog item to the server.
         */
        function upload() {
            vm.invalidMessage = undefined;

            if (!vm.file) {
                notificationService.error('adminCceUpload.fileIsNotSelected');
            } else {
                var loadingPromise = loadingModalService.open();
                catalogItemService.upload(vm.file).then(function(data) {
                    var message = messageService.get(
                        'adminCceUpload.uploadSuccess',
                        {amount: data.amount}
                    );
                    loadingPromise.then(function () {
                        notificationService.success(message);
                    });

                    $state.reload();
                }, function(error) {
                    notificationService.error('adminCceUpload.uploadFailed');
                    vm.invalidMessage = error ? error.data.message : undefined;
                    vm.file = undefined;
                    loadingModalService.close();
                });
            }
        }

        /**
         * @ngdoc method
         * @methodOf admin-cce-upload.controller:CceUploadController
         * @name getExportUrl
         *
         * @description
         * Returns url for downloading csv file with all catalog items.
         */
        function getExportUrl() {
            return catalogItemService.getDownloadUrl();
        }
    }

})();
