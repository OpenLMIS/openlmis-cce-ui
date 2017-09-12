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

    var $rootScope, $scope, $state, templateTestingUtils, template, vm, inventoryItem, messages,
        messageService, $timeout;

    beforeEach(prepareSuite);

    describe('Utilization dd', function() {

        it('should show translated label', function() {
            expect(templateTestingUtils.getElementById('dd', 'utilization').html())
                .toEqual('Active');
        });

    });

    describe('Program dd', function() {

        it('should show program name', function() {
            expect(templateTestingUtils.getElementById('dd', 'program').html())
                .toEqual('Some Program');
        });

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

    describe('Voltage Stabilizer dd', function() {

        it('should show translated label', function() {
            expect(templateTestingUtils.getElementById('dd', 'voltage-stabilizer').html())
                .toEqual('Yes');
        });

    });

    describe('Backup Generator dd', function() {

        it('should show translated label', function() {
            expect(templateTestingUtils.getElementById('dd', 'backup-generator').html())
                .toEqual('No');
        });

    });

    describe('Voltage Regulator dd', function() {

        it('should show translated label', function() {
            expect(templateTestingUtils.getElementById('dd', 'voltage-regulator').html())
                .toEqual('Unknown');
        });

    });

    describe('Manual Temperature Gauge', function() {

        it('should show translated label', function() {
            expect(templateTestingUtils.getElementById('dd', 'manual-temperature-gauge').html())
                .toEqual('Built In');
        });

    });

    describe('Remote Temperature Monitor', function() {

        it('should show translated label', function() {
            expect(templateTestingUtils.getElementById('dd', 'remote-temperature-monitor').html())
                .toEqual('Paired');
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

    describe('Close button', function() {

        it('should take user to the inventory item list', function() {
            templateTestingUtils.getButton('close').click();
            $timeout.flush();

            expect($state.go.calls[0].args[0]).toEqual('openlmis.cce.inventory');
        });

    });

    describe('Edit button', function() {

        it('should take user to the inventory item edit page', function() {
            templateTestingUtils.getButton('edit').click();
            $timeout.flush();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.edit', {
                inventoryItem: inventoryItem,
                inventoryItemId: inventoryItem.id
            });
        });

    });

    describe('Update Status button', function() {

        it('should take user to the inventory item status update page', function() {
            templateTestingUtils.getButton('status-update').click();
            $timeout.flush();

            expect($state.go).toHaveBeenCalledWith('openlmis.cce.inventory.statusUpdate', {
                inventoryItem: inventoryItem,
                inventoryItemId: inventoryItem.id
            });
        });

    });

    function prepareSuite() {
        module('openlmis-testing-utils');
        module('cce-inventory-item-details');

        inject(function($injector) {
            $state = $injector.get('$state');
            $timeout = $injector.get('$timeout');
            $rootScope = $injector.get('$rootScope');
            messageService = $injector.get('messageService');
            templateTestingUtils = $injector.get('templateTestingUtils');
        });

        inventoryItem = {
            additionalNotes: 'Some additional notes',
            catalogItem: {
                manufacturer: 'Haeier',
                model: 'LBL-1000'
            },
            source: 'Some source',
            yearOfWarrantyExpiry: '2017',
            voltageStabilizer: 'YES',
            backupGenerator: 'NO',
            voltageRegulator: 'UNKNOWN',
            manualTemperatureGauge: 'BUILD_IN',
            remoteTemperatureMonitor: 'PAIRED',
            utilization: 'ACTIVE',
            functionalStatus: 'FUNCTIONING',
            programId: 'some-program-id',
            facility: {
                supportedPrograms: [{
                    id: 'some-program-id',
                    name: 'Some Program'
                }]
            }
        };

        messages = {
            'cceInventoryItem.yes': 'Yes',
            'cceInventoryItem.no': 'No',
            'cceInventoryItem.unknown': 'Unknown',
            'cceInventoryItem.builtIn': 'Built In',
            'cceInventoryItem.paired': 'Paired',
            'cceInventoryItem.active': 'Active'
        };

        templateTestingUtils.init(this);

        spyOn($state, 'go');
        spyOn(messageService, 'get').andCallFake(function(key) {
            return messages[key];
        });

        var testContext = templateTestingUtils.prepareView(
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
