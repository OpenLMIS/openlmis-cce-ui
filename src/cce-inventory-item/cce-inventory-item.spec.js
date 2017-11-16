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

describe('InventoryItem', function() {

    var CCE_STATUS, ENERGY_SOURCE, inventoryItem, $rootScope, InventoryItem, InventoryItemDataBuilder,
        CatalogItemDataBuilder;

    beforeEach(function() {
        module('cce-inventory-item');

        inject(function($injector) {
            CCE_STATUS = $injector.get('CCE_STATUS');
            ENERGY_SOURCE = $injector.get('ENERGY_SOURCE');
            $rootScope = $injector.get('$rootScope');
            InventoryItem = $injector.get('InventoryItem');
            InventoryItemDataBuilder = $injector.get('InventoryItemDataBuilder');
            CatalogItemDataBuilder = $injector.get('CatalogItemDataBuilder');
        });
    });

    it('should merge facilities', function() {
        var item = new InventoryItemDataBuilder().build();

        expect(item.facility.href).not.toBeUndefined();
    });

    it('should throw exception when facility param has different ID than facility from provided inventory item', function() {
        expect(function() {
            new InventoryItemDataBuilder().withFacility('bad-facility').build()
        }).toThrow(new Error('Parameter facility has different ID than facility from provided inventory item!'));
    });

    it('should set voltageStabilizer as NOT_APPLICABLE if ENERGY_SOURCE is SOLAR', function() {
        var item = new InventoryItemDataBuilder()
                        .withCatalogItem(new CatalogItemDataBuilder().withEnergySource('SOLAR'))
                        .build();

        expect(item.voltageStabilizer).toBe(CCE_STATUS.NOT_APPLICABLE);
    });

    it('should set voltageRegulator as NOT_APPLICABLE if ENERGY_SOURCE is SOLAR', function() {
        var item = new InventoryItemDataBuilder()
                        .withCatalogItem(new CatalogItemDataBuilder().withEnergySource('SOLAR'))
                        .build();

        expect(item.voltageRegulator).toBe(CCE_STATUS.NOT_APPLICABLE);
    });

    it('should set backupGenerator as NOT_APPLICABLE if ENERGY_SOURCE is SOLAR', function() {
        var item = new InventoryItemDataBuilder()
                        .withCatalogItem(new CatalogItemDataBuilder().withEnergySource('SOLAR'))
                        .build();

        expect(item.backupGenerator).toBe(CCE_STATUS.NOT_APPLICABLE);
    });

    it('should not set default options if ENERGY_SOURCE is different than SOLAR', function() {
        var item = new InventoryItemDataBuilder().build();

        expect(item.voltageStabilizer).toEqual('YES');
        expect(item.voltageRegulator).toEqual('YES');
        expect(item.backupGenerator).toEqual('YES');
    });

});
