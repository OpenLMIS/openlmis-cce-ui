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
        .constant('VOLTAGE_STABILIZER_STATUS', VOLTAGE_STABILIZER_STATUS());

    VOLTAGE_STABILIZER_STATUS.$inject = [];

    function VOLTAGE_STABILIZER_STATUS() {
        var VOLTAGE_STABILIZER_STATUS = {
                YES: 'YES',
                NO: 'NO',
                UNKNOWN: 'UNKNOWN',
                NOT_APPLICABLE: 'NOT_APPLICABLE',
                getLabel: getLabel,
                getStatuses: getStatuses
            },
            labels = {
                YES: 'cceInventoryItem.yes',
                NO: 'cceInventoryItem.no',
                UNKNOWN: 'cceInventoryItem.unknown',
                NOT_APPLICABLE: 'cceInventoryItem.notApplicable'
            };

        return VOLTAGE_STABILIZER_STATUS;

        function getLabel(status) {
            return labels[status];
        }

        function getStatuses() {
            return [
                VOLTAGE_STABILIZER_STATUS.YES,
                VOLTAGE_STABILIZER_STATUS.NO,
                VOLTAGE_STABILIZER_STATUS.UNKNOWN,
                VOLTAGE_STABILIZER_STATUS.NOT_APPLICABLE
            ];
        }


    }

})();
