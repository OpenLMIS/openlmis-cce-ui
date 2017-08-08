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

describe('BACKUP_GENERATOR_STATUS', function() {

    var BACKUP_GENERATOR_STATUS;

    beforeEach(function() {
        module('cce-inventory-item');

        inject(function($injector) {
            BACKUP_GENERATOR_STATUS = $injector.get('BACKUP_GENERATOR_STATUS');
        });
    });

    describe('getLabel', function() {

        it('should return label for valid status', function() {
            expect(
                BACKUP_GENERATOR_STATUS.getLabel('YES')
            ).toEqual('cceInventoryItem.yes');

            expect(
                BACKUP_GENERATOR_STATUS.getLabel('NO')
            ).toEqual('cceInventoryItem.no');

            expect(
                BACKUP_GENERATOR_STATUS.getLabel('UNKNOWN')
            ).toEqual('cceInventoryItem.unknown');

            expect(
                BACKUP_GENERATOR_STATUS.getLabel('NOT_APPLICABLE')
            ).toEqual('cceInventoryItem.notApplicable');
        });

        it('should throw exception for invalid source', function() {
            expect(function() {
                BACKUP_GENERATOR_STATUS.getLabel('NON_EXISTENT_SOURCE');
            }).toThrow('"NON_EXISTENT_SOURCE" is not a valid status');

            expect(function() {
                BACKUP_GENERATOR_STATUS.getLabel(undefined);
            }).toThrow('"undefined" is not a valid status');

            expect(function() {
                BACKUP_GENERATOR_STATUS.getLabel(null);
            }).toThrow('"null" is not a valid status');

            expect(function() {
                BACKUP_GENERATOR_STATUS.getLabel('');
            }).toThrow('"" is not a valid status');
        });

    });

    describe('getStatuses', function() {

        it('should return a list of statuses', function() {
            expect(BACKUP_GENERATOR_STATUS.getStatuses()).toEqual([
                'YES',
                'NO',
                'UNKNOWN',
                'NOT_APPLICABLE'
            ]);
        });

    });

});
