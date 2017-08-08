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

describe('MANUAL_TEMPERATURE_GAUGE_TYPE', function() {

    var MANUAL_TEMPERATURE_GAUGE_TYPE;

    beforeEach(function() {
        module('cce-inventory-item');

        inject(function($injector) {
            MANUAL_TEMPERATURE_GAUGE_TYPE = $injector.get('MANUAL_TEMPERATURE_GAUGE_TYPE');
        });
    });

    describe('getLabel', function() {

        it('should return label for valid type', function() {
            expect(
                MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel('BUILT_IN')
            ).toEqual('cceInventoryItem.builtIn');

            expect(
                MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel('PAIRED')
            ).toEqual('cceInventoryItem.paired');

            expect(
                MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel('NO_GAUGE')
            ).toEqual('cceInventoryItem.noGauge');
        });

        it('should throw exception for invalid type', function() {
            expect(function() {
                MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel('NON_EXISTENT_SOURCE');
            }).toThrow('"NON_EXISTENT_SOURCE" is not a valid status');

            expect(function() {
                MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel(undefined);
            }).toThrow('"undefined" is not a valid status');

            expect(function() {
                MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel(null);
            }).toThrow('"null" is not a valid status');

            expect(function() {
                MANUAL_TEMPERATURE_GAUGE_TYPE.getLabel('');
            }).toThrow('"" is not a valid status');
        });

    });

    describe('getTypes', function() {

        it('should return a list of types', function() {
            expect(MANUAL_TEMPERATURE_GAUGE_TYPE.getTypes()).toEqual([
                'BUILT_IN',
                'PAIRED',
                'NO_GAUGE'
            ]);
        });

    });

});
