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
     * @ngdoc object
     * @name cce-inventory-item-status.REASON_FOR_NOT_WORKING
     *
     * @description
     * Contains all possible reasons for not working or not being in use.
     */
    angular
        .module('cce-inventory-item-status')
        .constant('REASON_FOR_NOT_WORKING', reasons());

    function reasons() {
        var REASON_FOR_NOT_WORKING = {
                NEEDS_SPARE_PARTS: 'NEEDS_SPARE_PARTS',
                NO_FINANCE: 'NO_FINANCE',
                NO_FUEL: 'NO_FUEL',
                SURPLUS: 'SURPLUS',
                DEAD: 'DEAD',
                NOT_IN_USE: 'NOT_IN_USE',
                DECOMMISSIONED: 'DECOMMISSIONED',
                NOT_APPLICABLE: 'NOT_APPLICABLE',
                AWAITING_REPAIR: 'AWAITING_REPAIR',
                UNSERVICEABLE: 'UNSERVICEABLE',
                getLabel: getLabel,
                getReasons: getReasons
            },
            labels = {
                NEEDS_SPARE_PARTS: 'cceInventoryItemStatus.needsSpareParts',
                NO_FINANCE: 'cceInventoryItemStatus.noFinance',
                NO_FUEL: 'cceInventoryItemStatus.noFuel',
                SURPLUS: 'cceInventoryItemStatus.surplus',
                DEAD: 'cceInventoryItemStatus.dead',
                NOT_IN_USE: 'cceInventoryItemStatus.notInUse',
                DECOMMISSIONED: 'cceInventoryItemStatus.decommissioned',
                NOT_APPLICABLE: 'cceInventoryItemStatus.notApplicable',
                AWAITING_REPAIR: 'cceInventoryItemStatus.awaitingRepair',
                UNSERVICEABLE: 'cceInventoryItemStatus.unserviceable'
            };

        return REASON_FOR_NOT_WORKING;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-status.REASON_FOR_NOT_WORKING
         * @name getLabel
         *
         * @description
         * Returns the label for the given status.
         *
         * @param   {String}    reason  the status to get the label for
         * @return  {String}            the label for the given status
         */
        function getLabel(reason) {
            var label = labels[reason];

            if (!label) {
                throw 'Invalid reason';
            }
            return label;
        }

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-status.REASON_FOR_NOT_WORKING
         * @name getReasons
         *
         * @description
         * Returns all the reasons as a list.
         *
         * @return  {Array} the list of all reasons
         */
        function getReasons() {
            return [
                REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS,
                REASON_FOR_NOT_WORKING.NO_FINANCE,
                REASON_FOR_NOT_WORKING.NO_FUEL,
                REASON_FOR_NOT_WORKING.SURPLUS,
                REASON_FOR_NOT_WORKING.DEAD,
                REASON_FOR_NOT_WORKING.NOT_IN_USE,
                REASON_FOR_NOT_WORKING.DECOMMISSIONED,
                REASON_FOR_NOT_WORKING.NOT_APPLICABLE,
                REASON_FOR_NOT_WORKING.AWAITING_REPAIR,
                REASON_FOR_NOT_WORKING.UNSERVICEABLE
            ];
        }
    }

})();
