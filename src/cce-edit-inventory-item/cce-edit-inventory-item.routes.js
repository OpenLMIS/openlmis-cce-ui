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
        .module('cce-edit-inventory-item')
        .config(config);

    config.$inject = ['$stateProvider', 'CCE_RIGHTS'];

    function config($stateProvider, CCE_RIGHTS) {
        var dialog;

        $stateProvider.state('openlmis.cce.inventory.edit', {
            accessRights: [CCE_RIGHTS.CCE_INVENTORY_EDIT],
            url: '/:inventoryItemId/edit',
            onEnter: onEnter,
            onExit: onExit,
            params: {
                inventoryItem: undefined,
                inventoryItemId: undefined
            }
        });

        onEnter.$inject = [
            'openlmisModalService', '$stateParams', 'inventoryItemFactory', '$state'
        ];
        function onEnter(openlmisModalService, $stateParams, inventoryItemFactory, $state) {
            dialog = openlmisModalService.createDialog({
                backdrop: 'static',
                controller: 'EditInventoryItemController',
                controllerAs: 'vm',
                templateUrl: 'cce-edit-inventory-item/edit-inventory-item.html',
                resolve: {
                    inventoryItem: function() {
                        if ($stateParams.inventoryItem) {
                            return $stateParams.inventoryItem;
                        } else if ($stateParams.inventoryItemId) {
                            return inventoryItemFactory.get($stateParams.inventoryItemId);
                        }
                        $state.go('openlmis.cce.inventory.add');
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
