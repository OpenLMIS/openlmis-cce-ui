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
     * @name facility-cce-status.controller:CceStatusController
     *
     * @description
     * Exposes CCE status to the view.
     */
    angular
        .module('facility-cce-status')
        .controller('CceStatusController', CceStatusController);

    CceStatusController.$inject = ['FUNCTIONAL_STATUS', 'inventoryItemService',
        'FACILITY_CCE_STATUS', 'permissionService', 'authorizationService', 'CCE_RIGHTS',
        'cceAlertFactory'];

    function CceStatusController(FUNCTIONAL_STATUS, inventoryItemService, FACILITY_CCE_STATUS,
                                 permissionService, authorizationService, CCE_RIGHTS,
                                 cceAlertFactory) {
        var vm = this;

        vm.$onInit = onInit;
        vm.getFunctionalStatusClass = FUNCTIONAL_STATUS.getClass;

        /**
         * @ngdoc property
         * @propertyOf facility-cce-status.controller:CceStatusController
         * @name statusLabel
         * @type {String}
         *
         * @description
         * Holds status label.
         */
        vm.statusLabel = undefined;

        /**
         * @ngdoc property
         * @propertyOf facility-cce-status.controller:CceStatusController
         * @name statusClass
         * @type {String}
         *
         * @description
         * Holds status class.
         */
        vm.statusClass = undefined;

        /**
         * @ngdoc property
         * @propertyOf facility-cce-status.controller:CceStatusController
         * @name inventoryItems
         * @type {Array}
         *
         * @description
         * Holds list of inventory items for facility.
         */
        vm.inventoryItems = undefined;

        /**
         * @ngdoc property
         * @propertyOf facility-cce-status.controller:CceStatusController
         * @name cceAlerts
         * @type {Object}
         *
         * @description
         * Holds map of alerts related to inventory items for facility.
         */
        vm.cceAlerts = undefined;

        /**
         * @ngdoc property
         * @propertyOf facility-cce-status.controller:CceStatusController
         * @name alertStatusClass
         * @type {String}
         *
         * @description
         * Holds string of CSS class.
         */
        vm.alertStatusClass = undefined;

        /**
         * @ngdoc method
         * @methodOf facility-cce-status.controller:CceStatusController
         * @name $onInit
         *
         * @description
         * Initialization method of the CceStatusController.
         */
        function onInit() {
            setLabelAndClass(FACILITY_CCE_STATUS.LOADING);

            var authUser = authorizationService.getUser();
            var permission = {
                facilityId: vm.facility.id,
                right: CCE_RIGHTS.CCE_INVENTORY_VIEW
            };
            permissionService.hasPermissionWithAnyProgram(authUser.user_id, permission)
            .then(function () {
                return inventoryItemService.getAllForFacility(vm.facility.id);
            })
            .then(function (list) {
                vm.inventoryItems = list;
                setCceAlerts(list);
                var status = getStatus(list);
                setLabelAndClass(status);
            })
            .catch(function () {
                setLabelAndClass(FACILITY_CCE_STATUS.UNKNOWN);
            });
        }

        /**
         * @ngdoc method
         * @methodOf facility-cce-status.controller:CceStatusController
         * @name getStatus
         *
         * @description
         * Returns a Status based on inventory response.
         *
         * @param   {Object}    list    cce status
         * @return  {String}            the label for the inventory item
         */
        function getStatus(list) {
            if (list.length === 0) {
                return FACILITY_CCE_STATUS.NO_CCE;
            }
            var notFunctioningInventoryItems = filterNotFunctioningInventoryItems(list);
            if (notFunctioningInventoryItems.length === list.length || list.length === 0) {
                return FACILITY_CCE_STATUS.NOT_FUNCTIONING;
            } else if (notFunctioningInventoryItems.length > 0) {
                return FACILITY_CCE_STATUS.NOT_FULLY_FUNCTIONING;
            }
            return FACILITY_CCE_STATUS.All_FUNCTIONING;
        }

        function filterNotFunctioningInventoryItems(list) {
            return list.filter(function (inventory) {
                return inventory.functionalStatus !== FUNCTIONAL_STATUS.FUNCTIONING;
            });
        }

        function setLabelAndClass(status) {
            vm.statusLabel = FACILITY_CCE_STATUS.getLabel(status);
            vm.statusClass = FACILITY_CCE_STATUS.getClass(status);
        }

        function setCceAlerts(inventoryItems) {
            var inventoryItemIds = inventoryItems.map(function (item) {
                return item.id;
            });
            var queryParams = {
                deviceId: inventoryItemIds
            };
            cceAlertFactory.getAlertsGroupedByDevice(queryParams)
            .then(function (alertsMap) {
                vm.cceAlerts = alertsMap;
                setAlertClass(vm.cceAlerts);
            });
        }

        function setAlertClass(alertsMap) {
            if (Object.keys(alertsMap).length === 0) {
                vm.alertStatusClass = 'rtm-alert-status-unavailable';
            } else if (hasActiveAlerts(alertsMap)) {
                vm.alertStatusClass = 'rtm-alert-status-active';
            } else {
                vm.alertStatusClass = 'rtm-alert-status-inactive';
            }
        }

        function hasActiveAlerts(alertsMap) {
            var devicesWithActiveAlerts = Object.keys(alertsMap).filter(function (deviceId) {
                return alertsMap[deviceId].activeAlerts && alertsMap[deviceId].activeAlerts.length > 0;
            });
            return devicesWithActiveAlerts.length > 0;
        }
    }

})();
