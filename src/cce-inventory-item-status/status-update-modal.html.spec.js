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

describe('status-update-modal.html template', function() {

    var $controller, $compile, $rootScope, $templateRequest, $state, $q, $timeout;

    var inventoryItemService, FUNCTIONAL_STATUS, REASON_FOR_NOT_WORKING, stateTrackerService,
        FacilityProgramInventoryItemDataBuilder, templateTestingUtils, dateUtils;

    var vm, template, inventoryItem, inventoryItemBuilder, saveDeferred;

    beforeEach(function() {
        loadModules();
        injectServices();
        prepareTestData();
        initTestingUtils(this);
        prepareSpies();
        prepareView();
    });

    describe('Current Status fieldset', function() {

        it('should be hidden if current status is not set', function() {
            vm.inventoryItem = new FacilityProgramInventoryItemDataBuilder().withFunctionalStatus(undefined).build();

            $rootScope.$apply();

            expect(templateTestingUtils.getElementById('dl', 'current-status')).toBeUndefined();
        });

        it('should be visible if current status is set', function() {
            vm.inventoryItem = new FacilityProgramInventoryItemDataBuilder().withFunctionalStatus('FUNCTIONING').build();

            $rootScope.$apply();

            expect(templateTestingUtils.getElementById('dl', 'current-status')).not.toBeUndefined();
        });

    });

    describe('Functional Status select', function() {

        it('should be required', function() {
            expect(templateTestingUtils.getElementById('select', 'functional-status')).toBeRequired();
        });

    });

    describe('Reason not working or not in use select', function() {

        it('should clear after functional status changed', function() {
            var statusSelect = templateTestingUtils.getElementById('select', 'functional-status');

            vm.newStatus = FUNCTIONAL_STATUS.NON_FUNCTIONING;
            vm.reason = REASON_FOR_NOT_WORKING.UNSERVICEABLE;
            $rootScope.$apply();

            expect(getSelectedOption().indexOf('openlmisForm.selectAnOption') > -1).toBe(false);

            statusSelect.val('string:OBSOLETE');
            statusSelect.triggerHandler('change');
            $scope.$apply();

            expect(getSelectedOption().indexOf('openlmisForm.selectAnOption') > -1).toBe(true);
        });

        it('should be hidden for FUNCTIONING', function() {
            vm.newStatus = FUNCTIONAL_STATUS.FUNCTIONING;
            $rootScope.$apply();

            expect(templateTestingUtils.getElementById('select', 'reason')).toBeUndefined();
        });

        it('should be required for NON_FUNCTIONING', function() {
            vm.newStatus = FUNCTIONAL_STATUS.NON_FUNCTIONING;
            $rootScope.$apply();

            expect(templateTestingUtils.getElementById('select', 'reason')).toBeRequired();
        });

        it('should be required for OBSOLETE', function() {
            vm.newStatus = FUNCTIONAL_STATUS.OBSOLETE;
            $rootScope.$apply();

            expect(templateTestingUtils.getElementById('select', 'reason')).toBeRequired();
        });

        function getSelectedOption() {
            var selected;

            angular.forEach(templateTestingUtils.getElementById('select', 'reason').find('option'), function(option) {
                if (angular.element(option).attr('selected')) {
                    selected = angular.element(option);
                }
            });

            return selected.html();
        }

    });

    describe('Decommission Date input', function() {

        it('should clear after functional status changed', function() {
            var statusSelect = templateTestingUtils.getElementById('select', 'functional-status');

            vm.newStatus = FUNCTIONAL_STATUS.NON_FUNCTIONING;
            vm.decommissionDate = 2017;
            $rootScope.$apply();

            expect(vm.decommissionDate).not.toBeUndefined();

            statusSelect.val('string:OBSOLETE');
            statusSelect.triggerHandler('change');
            $scope.$apply();

            expect(vm.decommissionDate).toBeUndefined();
        });

        it('should be hidden for FUNCTIONING', function() {
            vm.newStatus = FUNCTIONAL_STATUS.FUNCTIONING;
            $rootScope.$apply();

            expect(templateTestingUtils.getInputs('decommission-date')[0]).toBeUndefined();
        });

        it('should be hidden for NON_FUNCTIONING', function() {
            vm.newStatus = FUNCTIONAL_STATUS.NON_FUNCTIONING;
            $rootScope.$apply();

            expect(templateTestingUtils.getInputs('decommission-date')[0]).toBeUndefined();
        });

        it('should be required for OBSOLETE', function() {
            vm.newStatus = FUNCTIONAL_STATUS.OBSOLETE;
            $rootScope.$apply();

            expect(templateTestingUtils.getElementById('input', 'decommission-date')).toBeRequired();
        });

    });

    describe('Update fieldset', function() {

        it('should be visible if user has CCE_INVENTORY_ITEM right', function() {
            vm.userHasRightToEdit = true;
            $rootScope.$apply();

            expect(templateTestingUtils.getElementById('fieldset', 'update-fieldset')).not.toBeHidden();
        });

        it('should be hidden if user has no CCE_INVENTORY_ITEM right', function() {
            vm.userHasRightToEdit = false;
            $rootScope.$apply();

            expect(templateTestingUtils.getElementById('fieldset', 'update-fieldset')).toBeHidden();
        });

    });

    describe('Update button', function() {

        var button;

        beforeEach(function() {
            button = templateTestingUtils.getButton('update');
        });

        it('should point to the form', function() {
            expect(button.attr('form')).toEqual('status-update-form');
        });

        it('should be a submit type', function() {
            expect(button.attr('type')).toEqual('submit');
        });

        it('should be visible if user has CCE_INVENTORY_ITEM right', function() {
            vm.userHasRightToEdit = true;
            $rootScope.$apply();

            expect(button).not.toBeHidden();
        });

        it('should be hidden if user has no CCE_INVENTORY_ITEM right', function() {
            vm.userHasRightToEdit = false;
            $rootScope.$apply();

            expect(button).toBeHidden();
        });

    });

    describe('Cancel button', function() {

        var button, formCtrl, confirmService, confirmDeferred, $q;

        beforeEach(function() {
            inject(function($injector) {
                confirmService = $injector.get('confirmService');
                $q = $injector.get('$q');
            });

            confirmDeferred = $q.defer();
            spyOn(confirmService, 'confirm').andReturn(confirmDeferred.promise);

            button = templateTestingUtils.getButton('cancel');
            formCtrl = templateTestingUtils.getElementById('form', 'status-update-form').controller('form');
        });

        it('should take user back to the previous page if the form was not dirty', function() {
            button.click();
            $timeout.flush();

            expect(stateTrackerService.goToPreviousState).toHaveBeenCalledWith(
                'openlmis.cce.inventory', {
                    inventoryItem: inventoryItem,
                    inventoryItemId: inventoryItem.id
                }
            );
        });

        it('should open confirmation modal if form was touched', function() {
            formCtrl.$setDirty();
            $rootScope.$apply();

            button.click();

            expect(confirmService.confirm).toHaveBeenCalled();
            expect(stateTrackerService.goToPreviousState).not.toHaveBeenCalled();
        });

        it('should take user back if form was dirty and confirmation was successful', function() {
            formCtrl.$setDirty();
            $rootScope.$apply();

            button.click();
            $rootScope.$apply();

            expect(confirmService.confirm).toHaveBeenCalled();
            expect(stateTrackerService.goToPreviousState).not.toHaveBeenCalled();

            confirmDeferred.resolve();
            $rootScope.$apply();

            expect(stateTrackerService.goToPreviousState).toHaveBeenCalledWith(
                'openlmis.cce.inventory', {
                    inventoryItem: inventoryItem,
                    inventoryItemId: inventoryItem.id
                }
            );
        });

        it('should not take user back if form was dirty and confirmation was unsuccessful', function() {
            formCtrl.$setDirty();
            $rootScope.$apply();

            button.click();
            $rootScope.$apply();

            expect(confirmService.confirm).toHaveBeenCalled();

            confirmDeferred.reject();
            $rootScope.$apply();

            expect(stateTrackerService.goToPreviousState).not.toHaveBeenCalled();
        });

    });

    describe('status-update-form', function() {

        var form, date;

        beforeEach(function() {
            form = templateTestingUtils.getElementById('form', 'status-update-form');
            date = "2017-08-11";
        });

        it('should take user back to the previous state after saving', function() {
            var expected = angular.merge({}, inventoryItem, {
                functionalStatus: FUNCTIONAL_STATUS.OBSOLETE,
                reasonNotWorkingOrNotInUse: REASON_FOR_NOT_WORKING.NOT_APPLICABLE,
                decommissionDate: date
            });

            vm.newStatus = expected.functionalStatus;
            vm.reason = expected.reasonNotWorkingOrNotInUse;
            vm.decommissionDate = expected.decommissionDate;

            $rootScope.$apply();
            form.triggerHandler('submit');

            expect(inventoryItemService.save).toHaveBeenCalledWith(expected);
            expect(stateTrackerService.goToPreviousState).not.toHaveBeenCalled();

            saveDeferred.resolve(expected);
            $rootScope.$apply();

            expect(stateTrackerService.goToPreviousState).toHaveBeenCalledWith(
                'openlmis.cce.inventory', {
                    inventoryItem: expected,
                    inventoryItemId: expected.id
                }
            );
        });

        it('should not take any action if form is invalid', function() {
            vm.newStatus = FUNCTIONAL_STATUS.OBSOLETE;
            vm.reason = REASON_FOR_NOT_WORKING.NOT_APPLICABLE;
            vm.decommissionDate = undefined;

            $rootScope.$apply();
            form.triggerHandler('submit');

            expect(inventoryItemService.save).not.toHaveBeenCalled();
            expect(stateTrackerService.goToPreviousState).not.toHaveBeenCalled();
        });

        it('should not take user anywhere if saving failed', function() {
            vm.newStatus = FUNCTIONAL_STATUS.OBSOLETE;
            vm.reason = REASON_FOR_NOT_WORKING.NOT_APPLICABLE;
            vm.decommissionDate = date;

            $rootScope.$apply();
            form.triggerHandler('submit');

            var item = inventoryItemBuilder
                        .withFunctionalStatus('OBSOLETE')
                        .withDecommissionDate(date)
                        .build();

            expect(inventoryItemService.save).toHaveBeenCalledWith(item);
            expect(stateTrackerService.goToPreviousState).not.toHaveBeenCalled();

            saveDeferred.reject();
            $rootScope.$apply();

            expect(stateTrackerService.goToPreviousState).not.toHaveBeenCalled();
        });

    });

    function loadModules() {
        module('openlmis-testing-utils');
        module('openlmis-form');
        module('openlmis-templates');
        module('cce-inventory-item-status');
    }

    function injectServices() {
        inject(function($injector) {
            $q = $injector.get('$q');
            $state = $injector.get('$state');
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            $templateRequest = $injector.get('$templateRequest');
            FUNCTIONAL_STATUS = $injector.get('FUNCTIONAL_STATUS');
            inventoryItemService = $injector.get('inventoryItemService');
            REASON_FOR_NOT_WORKING = $injector.get('REASON_FOR_NOT_WORKING');
            $timeout = $injector.get('$timeout');
            stateTrackerService = $injector.get('stateTrackerService');
            templateTestingUtils = $injector.get('templateTestingUtils');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
            dateUtils = $injector.get('dateUtils');
        });
    }

    function prepareTestData() {
        inventoryItemBuilder = new FacilityProgramInventoryItemDataBuilder().withId('some-inventory-item-id');
        inventoryItem = inventoryItemBuilder.build();
        cceActiveAlerts = {
            "device-1": [
                {
                    alert_id: "active-alert-1",
                    alert_type: "warning_hot",
                    device_id: "device-1",
                    end_ts: null,
                    start_ts: 1,
                    status: {
                        "en-US": "Equipment needs attention: too hot"
                    }
                }
            ]
        };
        saveDeferred = $q.defer();
    }

    function initTestingUtils(suite) {
        templateTestingUtils.init(suite);
    }

    function prepareSpies() {
        spyOn($state, 'go').andReturn();
        spyOn(inventoryItemService, 'save').andReturn(saveDeferred.promise);
        spyOn(stateTrackerService, 'goToPreviousState');
        spyOn(dateUtils, 'toDate').andCallFake(function(parameter) {
            return parameter;
        });
    }

    function prepareView() {
        var testContext = templateTestingUtils.prepareView(
            'cce-inventory-item-status/status-update-modal.html',
            'StatusUpdateModalController', {
                inventoryItem: inventoryItem,
                canEdit: true,
                cceActiveAlerts: cceActiveAlerts
            });

        vm = testContext.$scope.vm;
        template = testContext.template;
    }

});
