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

describe('inventory-item-details.html', function() {

    var $rootScope, $scope, templateTestingUtils, template, vm, inventoryItem;

    beforeEach(function() {
        loadModules();
        injectServices();
        prepareTestData();
        initTestingUtils(this);
        prepareView();
    });

    describe('Source dl', function() {

        it('should be visible if source is not empty', function() {
            expect(templateTestingUtils.getDl('source')).not.toBeUndefined();
        });

        it('should be hidden if source is empty', function() {
            vm.inventoryItem.source = undefined;
            $rootScope.$apply();

            expect(templateTestingUtils.getDl('source')).toBeUndefined();
        });

    });

    describe('Year of Warranty Expiry dl', function() {

        it('should be hidden if Year of Warranty Expiry is empty', function() {
            expect(templateTestingUtils.getDl('year-of-warranty-expiry')).not.toBeUndefined();
        });

        it('should be visible if Year of Warranty Expiry is not empty', function() {
            vm.inventoryItem.yearOfWarrantyExpiry = undefined;
            $rootScope.$apply();

            expect(templateTestingUtils.getDl('year-of-warranty-expiry')).toBeUndefined();
        });

    });

    describe('Additional Notes dl', function() {

        it('should be hidden if Additional Notes is empty', function() {
            expect(templateTestingUtils.getDl('additional-notes')).not.toBeUndefined();
        });

        it('should be visible if Additional Notes is not empty', function() {
            vm.inventoryItem.additionalNotes = undefined;
            $rootScope.$apply();

            expect(templateTestingUtils.getDl('additional-notes')).toBeUndefined();
        });

    });

    function loadModules() {
        module('openlmis-testing-utils');
        module('cce-inventory-item-details');
    }

    function injectServices() {
        inject(function($injector) {
            templateTestingUtils = $injector.get('templateTestingUtils');
            $rootScope = $injector.get('$rootScope');
        });
    }

    function prepareTestData() {
        inventoryItem = {
            additionalNotes: 'Some additional notes',
            catalogItem: {
                manufacturer: 'Haeier',
                model: 'LBL-1000'
            },
            source: 'Some source',
            yearOfWarrantyExpiry: '2017'
        };
    }

    function initTestingUtils(suite) {
        templateTestingUtils.init(suite);
    }

    function prepareView() {
        var testContext =
        templateTestingUtils.prepareView(
            'cce-inventory-item-details/inventory-item-details.html',
            'InventoryItemDetailsController', {
                inventoryItem: inventoryItem
            }
        );

        $scope = testContext.$scope;
        vm = $scope.vm;
        template = testContext.template;
    }

});
