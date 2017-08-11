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

describe('UTILIZATION_STATUS', function() {

    var UTILIZATION_STATUS;

    beforeEach(function() {
        module('cce-inventory-item');

        inject(function($injector) {
            UTILIZATION_STATUS = $injector.get('UTILIZATION_STATUS');
        });
    });

    describe('getLabel', function() {

        it('should return label for valid status', function() {
            expect(
                UTILIZATION_STATUS.getLabel('ACTIVE')
            ).toEqual('cceInventoryItem.active');

            expect(
                UTILIZATION_STATUS.getLabel('NOT_IN_USE')
            ).toEqual('cceInventoryItem.notInUse');

            expect(
                UTILIZATION_STATUS.getLabel('IN_STORE_FOR_ALLOCATION')
            ).toEqual('cceInventoryItem.inStoreForAllocation');
        });

        it('should throw exception for invalid source', function() {
            expect(function() {
                UTILIZATION_STATUS.getLabel('NON_EXISTENT_SOURCE');
            }).toThrow('"NON_EXISTENT_SOURCE" is not a valid status');

            expect(function() {
                UTILIZATION_STATUS.getLabel(undefined);
            }).toThrow('"undefined" is not a valid status');

            expect(function() {
                UTILIZATION_STATUS.getLabel(null);
            }).toThrow('"null" is not a valid status');

            expect(function() {
                UTILIZATION_STATUS.getLabel('');
            }).toThrow('"" is not a valid status');
        });

    });

    describe('getStatuses', function() {

        it('should return a list of statuses', function() {
            expect(UTILIZATION_STATUS.getStatuses()).toEqual([
                'ACTIVE',
                'NOT_IN_USE',
                'IN_STORE_FOR_ALLOCATION'
            ]);
        });

    });

});
