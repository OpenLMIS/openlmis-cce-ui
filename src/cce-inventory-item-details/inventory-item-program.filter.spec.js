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

describe('inventoryItemProgram', function() {

    var $filter, inventoryItem;

    beforeEach(prepareSuite);

    it('should return program name for given inventory', function() {
        expect($filter('inventoryItemProgram')(inventoryItem)).toEqual('Some Program');
    });

    it('should throw exception if program cannot be found', function() {
        inventoryItem.facility.supportedPrograms = [];

        expect(function() {
            $filter('inventoryItemProgram')(inventoryItem);
        }).toThrow('Can\'t find program with some-program-id');
    });

    function prepareSuite() {
        module('cce-inventory-item-details');

        inject(function($injector) {
            $filter = $injector.get('$filter');
        });

        inventoryItem = {
            programId: 'some-program-id',
            facility: {
                supportedPrograms: [{
                    id: 'some-program-id',
                    name: 'Some Program'
                }]
            }
        };
    }

});
