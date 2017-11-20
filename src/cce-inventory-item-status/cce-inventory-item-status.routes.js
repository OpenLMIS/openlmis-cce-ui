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
        .module('cce-inventory-item-status')
        .config(routes);

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
        var dialog;

        $stateProvider.state('openlmis.cce.inventory.statusUpdate', {
            url: '/:inventoryItemId/statusUpdate',
            params: {
                inventoryItemId: undefined,
                inventoryItem: undefined
            },
            onEnter: onEnter,
            onExit: onExit,
            resolve: {
                inventoryItem: function($stateParams, inventoryItemService, $state) {
                    if ($stateParams.inventoryItem) {
                        return $stateParams.inventoryItem;
                    } else if ($stateParams.inventoryItemId) {
                        return inventoryItemService.get($stateParams.inventoryItemId);
                    }
                    $state.go('openlmis.cce.inventory.add');
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
                }
            }
        });

        onEnter.$inject = ['openlmisModalService', 'inventoryItem', 'canEdit'];

        function onEnter(openlmisModalService, inventoryItem, canEdit) {
            dialog = openlmisModalService.createDialog({
                backdrop: 'static',
                controller: 'StatusUpdateModalController',
                controllerAs: 'vm',
                templateUrl: 'cce-inventory-item-status/status-update-modal.html',
                resolve: {
                    inventoryItem: function() {
                        return inventoryItem;
                    },
                    canEdit: function() {
                        return canEdit;
                    }
                }
            });
        }

        function onExit() {
            if (dialog) {
                dialog.hide();
                dialog = undefined;
            }
        }
    }

})();
