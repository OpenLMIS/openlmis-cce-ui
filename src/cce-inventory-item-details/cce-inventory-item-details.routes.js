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
        .module('cce-inventory-item-details')
        .config(routes);

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
        var dialog;

        $stateProvider.state('openlmis.cce.inventory.item.details', {
            onEnter: onEnter,
            onExit: onExit,
            params: {
                inventoryItem: undefined
            },
            isOffline: true,
            url: '/details'
        });

        onEnter.$inject = ['openlmisModalService', 'inventoryItem', 'canEdit'];
        function onEnter(openlmisModalService, inventoryItem, canEdit) {
            dialog = openlmisModalService.createDialog({
                controller: 'InventoryItemDetailsController',
                controllerAs: 'vm',
                resolve: {
                    inventoryItem: function() {
                        return inventoryItem;
                    },
                    canEdit: function() {
                        return canEdit;
                    }
                },
                templateUrl: 'cce-inventory-item-details/inventory-item-details.html'
            });
        }

        function onExit() {
            dialog.hide();
            dialog = undefined;
        }

    }

})();
