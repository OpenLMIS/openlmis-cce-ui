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

    angular
        .module('cce-inventory-item')
        .config(routes);

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
        $stateProvider.state('openlmis.cce.inventory.item', {
            abstract: true,
            params: {
                inventoryItem: undefined
            },
            resolve: {
                inventoryItem: function($stateParams, inventoryItemFactory, programService) {
                    if (!$stateParams.inventoryItem) {
                        return inventoryItemFactory.get($stateParams.inventoryItemId);
                    }
                    return programService.get($stateParams.inventoryItem.program.id).then(function(program) {
                        var inventoryItem = angular.copy($stateParams.inventoryItem);
                        inventoryItem.program = program;
                        return inventoryItem;
                    });

                },
                canEdit: function(inventoryItem, authorizationService, permissionService, CCE_RIGHTS) {
                    var user = authorizationService.getUser();
                    return permissionService.hasPermission(user.user_id, {
                        right: CCE_RIGHTS.CCE_INVENTORY_EDIT,
                        facilityId: inventoryItem.facility.id,
                        programId: inventoryItem.program.id
                    })
                        .then(function() {
                            return true;
                        })
                        .catch(function() {
                            return false;
                        });
                },
                canTransfer: function(inventoryItem, authorizationService, permissionService, CCE_RIGHTS) {
                    var user = authorizationService.getUser();
                    return permissionService.hasPermission(user.user_id, {
                        right: CCE_RIGHTS.CCE_INVENTORY_TRANSFER,
                        facilityId: inventoryItem.facility.id,
                        programId: inventoryItem.program.id
                    })
                        .then(function() {
                            return true;
                        })
                        .catch(function() {
                            return false;
                        });
                }
            },
            url: '/:inventoryItemId'
        });

    }

})();
