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
        .module('cce-add-inventory-item')
        .config(config);

    config.$inject = ['$stateProvider', 'CCE_RIGHTS'];

    function config($stateProvider, CCE_RIGHTS) {
        var dialog;

        $stateProvider.state('openlmis.cce.inventory.add', {
            url: '/add',
            onEnter: onEnter,
            onExit: onExit,
            accessRights: [CCE_RIGHTS.CCE_INVENTORY_EDIT],
            resolve: {
                catalogItems: function(catalogItemService) {
                    return catalogItemService.search(false, true).then(function(response) {
                        return response.content;
                    });
                },
                types: function(catalogItems, catalogItemTypeFactory) {
                    return catalogItemTypeFactory.getTypes(catalogItems);
                }
            }
        });

        onEnter.$inject = ['openlmisModalService', 'catalogItems', 'types'];

        function onEnter(openlmisModalService, catalogItems, types) {
            dialog = openlmisModalService.createDialog({
                backdrop: 'static',
                templateUrl: 'cce-add-inventory-item/add-inventory-item.html',
                controller: 'AddInventoryItemController',
                controllerAs: 'vm',
                resolve: {
                    catalogItems: function() {
                        return catalogItems;
                    },
                    types: function() {
                        return types;
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
