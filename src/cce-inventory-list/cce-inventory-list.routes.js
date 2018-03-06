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

(function () {

    'use strict';

    angular
        .module('cce-inventory-list')
        .config(routes);

    routes.$inject = ['$stateProvider', 'CCE_RIGHTS'];

    function routes($stateProvider, CCE_RIGHTS) {

        $stateProvider.state('openlmis.cce.inventory', {
            showInNavigation: true,
            label: 'cceInventoryList.cceInventory',
            url: '/inventory?page&size&facility&program&supervised&functionalStatus',
            params: { expand: 'lastModifier' },
            controller: 'CceInventoryListController',
            templateUrl: 'cce-inventory-list/cce-inventory-list.html',
            controllerAs: 'vm',
            accessRights: [CCE_RIGHTS.CCE_INVENTORY_VIEW, CCE_RIGHTS.CCE_INVENTORY_EDIT],
            resolve: {
                user: function (authorizationService) {
                    return authorizationService.getUser();
                },
                inventoryItems: function (facilityInventoryItemFactory, paginationService, $stateParams) {
                    return paginationService.registerUrl($stateParams, function (stateParams) {
                        if (stateParams.facility && stateParams.program) {
                            var stateParamsCopy = angular.copy(stateParams);
                            stateParamsCopy.facilityId = stateParams.facility;
                            stateParamsCopy.programId = stateParams.program;

                            delete stateParamsCopy.facility;
                            delete stateParamsCopy.program;

                            return facilityInventoryItemFactory.query(stateParamsCopy);
                        }

                        return [];
                    });
                },
                canEdit: function(permissionService, user, $stateParams, CCE_RIGHTS) {
                    return permissionService.hasPermission(user.user_id, {
                        right: CCE_RIGHTS.CCE_INVENTORY_EDIT,
                        programId: $stateParams.program,
                        facilityId: $stateParams.facility
                    })
                    .then(function() {
                        return true;
                    })
                    .catch(function() {
                        return false;
                    });
                },
                cceAlerts: function (cceAlertFactory, inventoryItems) {
                    var inventoryItemIds = inventoryItems.map(function (item) {
                        return item.id;
                    });
                    var queryParams = {
                        deviceId: inventoryItemIds
                    };
                    return cceAlertFactory.getAlertsGroupedByDevice(queryParams);
                }
            }
        });
    }
})();
