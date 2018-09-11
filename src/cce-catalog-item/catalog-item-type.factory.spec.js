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

describe('catalogItemTypeFactory', function() {

    var catalogItemTypeFactory, catalogItems, CatalogItemDataBuilder;

    beforeEach(function() {
        module('cce-catalog-item');

        inject(function($injector) {
            catalogItemTypeFactory = $injector.get('catalogItemTypeFactory');
            CatalogItemDataBuilder = $injector.get('CatalogItemDataBuilder');
        });

        catalogItems = [
            new CatalogItemDataBuilder().withType('Type One')
                .build(),
            new CatalogItemDataBuilder().withType('Type Two')
                .build(),
            new CatalogItemDataBuilder().withType('Type Three')
                .build(),
            new CatalogItemDataBuilder().withType('Type Four')
                .build(),
            new CatalogItemDataBuilder().withType('Type Two')
                .build(),
            new CatalogItemDataBuilder().withType('Type Two')
                .build(),
            new CatalogItemDataBuilder().withType('Type One')
                .build()
        ];
    });

    describe('getTypes', function() {

        it('should return a set of types', function() {
            var result;

            result = catalogItemTypeFactory.getTypes(catalogItems);

            expect(result.length).toBe(4);
            expect(result.indexOf('Type One') > -1).toBe(true);
            expect(result.indexOf('Type Two') > -1).toBe(true);
            expect(result.indexOf('Type Three') > -1).toBe(true);
            expect(result.indexOf('Type Four') > -1).toBe(true);
        });

        it('should throw exception if type list undefined', function() {
            expect(function() {
                catalogItemTypeFactory.getTypes(undefined);
            }).toThrow('The list of catalog items must be defined');
        });

        it('should return empty list for empty list', function() {
            var result;

            result = catalogItemTypeFactory.getTypes([]);

            expect(result).toEqual([]);
        });

    });

});
