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

describe('ENERGY_SOURCE', function() {

    var ENERGY_SOURCE;

    beforeEach(function() {
        module('cce-catalog-item');

        inject(function($injector) {
            ENERGY_SOURCE = $injector.get('ENERGY_SOURCE');
        });
    });

    describe('getLabel', function() {

        it('should return label for valid source', function() {
            expect(ENERGY_SOURCE.getLabel('ELECTRIC')).toEqual('cceCatalogItem.electric');
            expect(ENERGY_SOURCE.getLabel('SOLAR')).toEqual('cceCatalogItem.solar');
            expect(ENERGY_SOURCE.getLabel('GASOLINE')).toEqual('cceCatalogItem.gasoline');
            expect(ENERGY_SOURCE.getLabel('NOT_APPLICABLE')).toEqual('cceCatalogItem.notApplicable');
        });

        it('should throw exception for invalid source', function() {
            expect(function() {
                ENERGY_SOURCE.getLabel('NON_EXISTENT_SOURCE');
            }).toThrow('"NON_EXISTENT_SOURCE" is not a valid source');

            expect(function() {
                ENERGY_SOURCE.getLabel(undefined);
            }).toThrow('"undefined" is not a valid source');

            expect(function() {
                ENERGY_SOURCE.getLabel(null);
            }).toThrow('"null" is not a valid source');

            expect(function() {
                ENERGY_SOURCE.getLabel('');
            }).toThrow('"" is not a valid source');
        });

    });

    describe('getSources', function() {

        it('should return a list of sources', function() {
            expect(ENERGY_SOURCE.getSources()).toEqual([
                'ELECTRIC',
                'SOLAR',
                'GASOLINE',
                'NOT_APPLICABLE'
            ]);
        });

    });

});
