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

describe('status-update-button directive', function() {

    var $scope, button, inventoryItem, $rootScope, $compile, $state, $timeout;

    beforeEach(prepareSuite);

    it('should spawn a button', function() {
        compileButton();

        expect(button.is('button')).toBe(true);
    });

    it('should take user to status update page after clicking', function() {
        compileButton();

        button.click();
        $timeout.flush();

        expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.statusUpdate',{
            inventoryItem: inventoryItem,
            inventoryItemId: inventoryItem.id
        });
    });

    it('should have is-functioning status for FUNCTIONING functional status', function() {
        compileButton();

        expect(button.hasClass('is-functioning')).toBe(true);
    });

    it('should have is-non-functioning status  for NON_FUNCTIONING functional status', function() {
        inventoryItem.functionalStatus = 'NON_FUNCTIONING';

        compileButton();

        expect(button.hasClass('is-non-functioning')).toBe(true);
    });

    it('should have is-obsolete status for OBSOLETE functional status', function() {
        inventoryItem.functionalStatus = 'OBSOLETE';

        compileButton();

        expect(button.hasClass('is-obsolete')).toBe(true);
    });

    function prepareSuite() {
        module('cce-status-update-button');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
            $state = $injector.get('$state');
            $timeout = $injector.get('$timeout');
        });

        inventoryItem = {
            id: '',
            functionalStatus: 'FUNCTIONING'
        };

        $scope = $rootScope.$new();
        $scope.vm = {
            inventoryItem: inventoryItem
        };

        spyOn($state, 'go');
    }

    function compileButton() {
        button = $compile(
            '<status-update-button inventory-item="vm.inventoryItem"></status-update-button>'
        )($scope);
        $scope.$apply();
    }

});
