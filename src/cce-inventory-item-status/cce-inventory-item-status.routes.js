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

        $stateProvider.state('openlmis.cce.inventory.item.statusUpdate', {
            url: '/statusUpdate',
            params: {
                inventoryItemId: undefined,
                inventoryItem: undefined
            },
            onEnter: onEnter,
            onExit: onExit,
            resolve: {
                cceAlerts: function(cceAlertFactory, inventoryItem) {
                    var queryParams = {
                        deviceId: inventoryItem.id
                    };
                    return cceAlertFactory.getAlertsGroupedByDevice(queryParams);
                }
            }
        });

        onEnter.$inject = ['openlmisModalService', 'inventoryItem', 'canEdit', 'canTransfer', 'cceAlerts'];

        function onEnter(openlmisModalService, inventoryItem, canEdit, canTransfer, cceAlerts) {
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
                    },
                    canTransfer: function() {
                        return canTransfer;
                    },
                    cceAlerts: function() {
                        return cceAlerts;
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
