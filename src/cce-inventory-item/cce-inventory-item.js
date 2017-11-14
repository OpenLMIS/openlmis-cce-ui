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
     * @ngdoc service
     * @name cce-inventory-item.InventoryItem
     *
     * @description
     * Represents a single inventory item.
     */
    angular
    .module('cce-inventory-item')
    .factory('InventoryItem', inventoryItem);

    inventoryItem.$inject = ['CCE_STATUS', 'ENERGY_SOURCE'];

    function inventoryItem(CCE_STATUS, ENERGY_SOURCE) {

        return InventoryItem;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item.InventoryItem
         * @name InventoryItem
         *
         * @description
         * Creates a new instance of the InventoryItem class.
         *
         * @param  {Object} source  the inventory item to be updated
         * @return {Object}         the inventory item with default options
         */
        function InventoryItem(source, facility) {
            angular.copy(source, this);

            if (this.catalogItem.energySource === ENERGY_SOURCE.SOLAR) {
                this.voltageStabilizer = CCE_STATUS.NOT_APPLICABLE;
                this.voltageRegulator = CCE_STATUS.NOT_APPLICABLE;
                this.backupGenerator = CCE_STATUS.NOT_APPLICABLE;
            }

            if (this.facility.id === facility.id) {
                this.facility = facility;
            } else {
                throw 'Parameter facility has different ID than facility from provided inventory item!';
            }
        }
    }
})();
