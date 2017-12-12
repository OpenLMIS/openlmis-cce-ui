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
     * @name cce-status.controller:CceStatusController
     *
     * @description
     * Exposes CCE status to the view.
     */
    angular
        .module('cce-status')
        .controller('CceStatusController', InventoryItemDetailsController);

    InventoryItemDetailsController.$inject = ['FUNCTIONAL_STATUS', 'inventoryItemService', 'STATUS', '$q'];

    function InventoryItemDetailsController(FUNCTIONAL_STATUS, inventoryItemService, STATUS, $q) {
        var vm = this;

        vm.$onInit = onInit;

        /**
         * @ngdoc property
         * @propertyOf cce-status.controller:CceStatusController
         * @name page
         * @type {string}
         *
         * @description
         * Holds status label.
         */
        vm.statusLabel = undefined;

        /**
         * @ngdoc property
         * @propertyOf cce-status.controller:CceStatusController
         * @name page
         * @type {string}
         *
         * @description
         * Holds status class.
         */
        vm.statusClass = undefined;

        /**
         * @ngdoc method
         * @methodOf cce-status.controller:CceStatusController
         * @name $onInit
         *
         * @description
         * Initialization method of the CceStatusController.
         */
        function onInit() {
            var list = [],
                deferred = $q.defer();
            setLabelAndClass(STATUS.LOADING);

            query(list, 0, deferred);

            deferred.promise.then(function (list) {
                var status = getStatus(list);
                setLabelAndClass(status);
            });
        }

        function setLabelAndClass(status) {
            vm.statusLabel = getStatusLabel(status);
            vm.statusClass = getStatusClass(status);
        }

        function query(list, pageNumber, deferred) {
            inventoryItemService.query({
                page: pageNumber,
                facilityId: vm.facility.id
            }).then(function (page) {
                list = list.concat(page.content);
                if (!page.last) {
                    query(list, ++pageNumber, deferred);
                } else {
                    deferred.resolve(list);
                }
            });
        }

        /**
         * @ngdoc method
         * @methodOf cce-status.controller:CceStatusController
         * @name getStatus
         *
         * @description
         * Returns a Status based on inventory response.
         *
         * @param   {Object}    list    cce status
         * @return  {String}            the label for the inventory item
         */
        function getStatus(list) {
            var notFunctioning = list.filter(function (inventory) {
                return inventory.functionalStatus === FUNCTIONAL_STATUS.NON_FUNCTIONING
                    || inventory.functionalStatus === FUNCTIONAL_STATUS.OBSOLETE;
            });
            if (notFunctioning.length === list.length) {
                return STATUS.NOT_FUNCTIONING;
            } else if (notFunctioning.length > 0) {
                return STATUS.NOT_FULLY_FUNCTIONING;
            } else {
                return STATUS.All_FUNCTIONING;
            }
        }

        /**
         * @ngdoc method
         * @methodOf cce-status.controller:CceStatusController
         * @name getStatusLabel
         *
         * @description
         * Returns a status label.
         *
         * @param   {String}    status  cce status
         * @return  {String}            the label for the inventory item
         */
        function getStatusLabel(status) {
            return STATUS.getLabel(status);
        }

        /**
         * @ngdoc method
         * @methodOf cce-status.controller:CceStatusController
         * @name getStatusClass
         *
         * @description
         * Returns a status class.
         *
         * @param   {String}    status  cce status
         * @return  {String}            the class for the inventory item
         */
        function getStatusClass(status) {
            return STATUS.getClass(status);
        }
    }

})();
