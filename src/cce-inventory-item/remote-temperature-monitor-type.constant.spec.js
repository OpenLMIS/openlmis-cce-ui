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

describe('REMOTE_TEMPERATURE_MONITOR_TYPE', function() {

    var REMOTE_TEMPERATURE_MONITOR_TYPE;

    beforeEach(function() {
        module('cce-inventory-item');

        inject(function($injector) {
            REMOTE_TEMPERATURE_MONITOR_TYPE = $injector.get('REMOTE_TEMPERATURE_MONITOR_TYPE');
        });
    });

    describe('getLabel', function() {

        it('should return label for valid type', function() {
            expect(
                REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel('BUILD_IN')
            ).toEqual('cceInventoryItem.builtIn');

            expect(
                REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel('PAIRED')
            ).toEqual('cceInventoryItem.paired');

            expect(
                REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel('NO_RTM')
            ).toEqual('cceInventoryItem.noRtm');
        });

        it('should throw exception for invalid type', function() {
            expect(function() {
                REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel('NON_EXISTENT_SOURCE');
            }).toThrow('"NON_EXISTENT_SOURCE" is not a valid status');

            expect(function() {
                REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel(undefined);
            }).toThrow('"undefined" is not a valid status');

            expect(function() {
                REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel(null);
            }).toThrow('"null" is not a valid status');

            expect(function() {
                REMOTE_TEMPERATURE_MONITOR_TYPE.getLabel('');
            }).toThrow('"" is not a valid status');
        });

    });

    describe('getTypes', function() {

        it('should return a list of types', function() {
            expect(REMOTE_TEMPERATURE_MONITOR_TYPE.getTypes()).toEqual([
                'BUILD_IN',
                'PAIRED',
                'NO_RTM'
            ]);
        });

    });

});
