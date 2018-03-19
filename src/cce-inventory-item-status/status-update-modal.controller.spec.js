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

describe('StatusUpdateModalController', function() {

    var vm, messageService, $q, $state, $rootScope, inventoryItem, $controller,
        loadingModalService, notificationService, messages, FUNCTIONAL_STATUS,
        REASON_FOR_NOT_WORKING, inventoryItemService, saveDeferred, $scope, date,
        stateTrackerService, FacilityProgramInventoryItemDataBuilder, cceAlerts,
        cceAlertFactory, cceAlert, CCEAlertDataBuilder, alertSaveDeferred,
        accessTokenFactory, cceUrlFactory, $window;

    beforeEach(prepareSuite);

    describe('$onInit', function() {

        it('should copy item', function() {
            vm.$onInit();

            expect(vm.inventoryItem).not.toBe(inventoryItem);
            expect(vm.inventoryItem).toEqual(inventoryItem);
        });

        it('should pre-set new status', function() {
            vm.$onInit();

            expect(vm.newStatus).toEqual(inventoryItem.functionalStatus);
        });

        it('should pre-set reason', function() {
            vm.$onInit();

            expect(vm.reason).toEqual(inventoryItem.reasonNotWorkingOrNotInUse);
        });

        it('should expose statuses', function() {
            vm.$onInit();

            expect(vm.statuses).toEqual(FUNCTIONAL_STATUS.getStatuses());
        });

        it('should expose reasons', function() {
            vm.$onInit();

            expect(vm.reasons).toEqual(REASON_FOR_NOT_WORKING.getReasons());
        });

        it('should expose decommissionDate', function() {
            vm.$onInit();

            expect(vm.decommissionDate).toEqual('2017-01-01');
        });

        it('should expose cceAlerts', function() {
            vm.$onInit();

            expect(vm.cceAlerts).toBeDefined();
        });

        it('should set userHasRightToEdit as true if user has CCE_INVENTORY_EDIT right', function() {
            vm.$onInit();

            expect(vm.userHasRightToEdit).toBe(true);
        });

        it('should set userHasRightToEdit as false if user has no CCE_INVENTORY_EDIT right', function() {
            vm = $controller('StatusUpdateModalController', {
                inventoryItem: inventoryItem,
                $scope: $scope,
                canEdit: false,
                cceAlerts: cceAlerts
            });

            vm.$onInit();

            expect(vm.userHasRightToEdit).toBe(false);
        });

    });

    describe('getStatusLabel', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should throw exception if status is invalid', function() {
            expect(function() {
                vm.getStatusLabel(undefined);
            }).toThrow('Invalid status');

            expect(function() {
                vm.getStatusLabel('SOME_INVALID_STATUS');
            }).toThrow('Invalid status');
        });

        it('should return localized label', function() {
            expect(vm.getStatusLabel(FUNCTIONAL_STATUS.FUNCTIONING)).toEqual('Functioning');
        });

    });

    describe('getReasonLabel', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should throw exception if reason is invalid', function() {
            expect(function() {
                vm.getReasonLabel(undefined);
            }).toThrow('Invalid reason');

            expect(function() {
                vm.getReasonLabel('SOME_INVALID_REASON');
            }).toThrow('Invalid reason');
        });

        it('should return localized label', function() {
            expect(
                vm.getReasonLabel(REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS)
            ).toEqual('Needs Spare Parts');
        });

    });

    describe('isFunctioning', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return true for FUNCTIONING status', function() {
            expect(vm.isFunctioning(FUNCTIONAL_STATUS.FUNCTIONING)).toBe(true);
        });

        it('should return false for status that is other than FUNCTIONING', function() {
            expect(vm.isFunctioning(FUNCTIONAL_STATUS.UNSERVICEABLE)).toBe(false);
            expect(vm.isFunctioning(FUNCTIONAL_STATUS.AWAITING_REPAIR)).toBe(false);
        });

    });

    describe('isUnserviceable', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should return true for UNSERVICEABLE status', function() {
            expect(vm.isUnserviceable(FUNCTIONAL_STATUS.UNSERVICEABLE)).toBe(true);
        });

        it('should return false for statuses other than UNSERVICEABLE', function()
         {
            expect(vm.isUnserviceable(FUNCTIONAL_STATUS.FUNCTIONING)).toBe(false);
            expect(vm.isUnserviceable(FUNCTIONAL_STATUS.AWAITING_REPAIR)).toBe(false);
        });

    });

    describe('save', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should not modify the original inventory item', function() {
            vm.newStatus = FUNCTIONAL_STATUS.OBSOLETE;
            vm.reason = REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS;
            vm.decommissionDate = date;

            vm.save();

            expect(inventoryItem.functionalStatus).toEqual(FUNCTIONAL_STATUS.FUNCTIONING);
            expect(inventoryItem.reasonNotWorkingOrNotInUse).toEqual(
                REASON_FOR_NOT_WORKING.NOT_IN_USE);
            expect(inventoryItem.decommissionDate).toEqual('2017-01-01');
        });

        it('should ignore reason and date for FUNCTIONING status', function() {
            vm.newStatus = FUNCTIONAL_STATUS.FUNCTIONING;
            vm.reason = REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS;
            vm.decommissionDate = date;

            vm.save();

            expect(inventoryItemService.save).toHaveBeenCalledWith(angular.merge(inventoryItem, {
                functionalStatus: FUNCTIONAL_STATUS.FUNCTIONING,
                reasonNotWorkingOrNotInUse: undefined,
                decommissionDate: undefined
            }));
        });

        it('should ignore date for NON_FUNCTIONING status', function() {
            vm.newStatus = FUNCTIONAL_STATUS.NON_FUNCTIONING;
            vm.reason = REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS;
            vm.decommissionDate = date;

            vm.save();

            expect(inventoryItemService.save).toHaveBeenCalledWith(angular.merge(inventoryItem, {
                functionalStatus: FUNCTIONAL_STATUS.NON_FUNCTIONING,
                reasonNotWorkingOrNotInUse: REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS,
                decommissionDate: undefined
            }));
        });

        it('should ignore date for AWAITING_REPAIR status', function() {
            vm.newStatus = FUNCTIONAL_STATUS.AWAITING_REPAIR;
            vm.reason = REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS;
            vm.decommissionDate = date;

            vm.save();

            expect(inventoryItemService.save).toHaveBeenCalledWith(angular.merge(inventoryItem, {
                functionalStatus: FUNCTIONAL_STATUS.AWAITING_REPAIR,
                reasonNotWorkingOrNotInUse: REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS,
                decommissionDate: undefined
            }));
        });

        it('should ignore date for AWAITING_REPAIR status', function() {
            vm.newStatus = FUNCTIONAL_STATUS.AWAITING_REPAIR;
            vm.reason = REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS;
            vm.decommissionDate = date;

            vm.save();

            expect(inventoryItemService.save).toHaveBeenCalledWith(angular.merge(inventoryItem, {
                functionalStatus: FUNCTIONAL_STATUS.AWAITING_REPAIR,
                reasonNotWorkingOrNotInUse: REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS,
                decommissionDate: undefined
            }));
        });

        it('should pass date and reason for UNSERVICEABLE status', function() {
            vm.newStatus = FUNCTIONAL_STATUS.UNSERVICEABLE;
            vm.reason = REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS;
            vm.decommissionDate = date;

            vm.save();

            expect(inventoryItemService.save).toHaveBeenCalledWith(angular.merge(inventoryItem, {
                functionalStatus: FUNCTIONAL_STATUS.UNSERVICEABLE,
                reasonNotWorkingOrNotInUse: REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS,
                decommissionDate: date
            }));
        });

        it('should redirect to the previous page after successful save', function() {
            vm.newStatus = FUNCTIONAL_STATUS.OBSOLETE;
            vm.reason = REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS;
            vm.decommissionDate = date;

            spyOn(loadingModalService, 'open').andReturn($q.when(true));
            spyOn(notificationService, 'success');

            vm.save();
            expect($state.go).not.toHaveBeenCalled();
            saveDeferred.resolve(inventoryItem);
            $rootScope.$apply();

            expect(stateTrackerService.goToPreviousState).toHaveBeenCalledWith(
                'openlmis.cce.inventory', {
                    inventoryItem: inventoryItem,
                    inventoryItemId: inventoryItem.id
                }
            );
            expect(notificationService.success)
                .toHaveBeenCalledWith('cceInventoryItemStatus.inventoryItemSaved');
        });

    });

    describe('clearReasonAndDecommissionDate', function() {

        it('should clear reason', function() {
            vm.reason = REASON_FOR_NOT_WORKING.NEEDS_SPARE_PARTS;

            vm.clearReasonAndDecommissionDate();

            expect(vm.reason).toBeUndefined();
        });

        it('should clear reason', function() {
            vm.decommissionDate = date;

            vm.clearReasonAndDecommissionDate();

            expect(vm.decommissionDate).toBeUndefined();
        });

    });

    describe('cancel', function() {

        var $q, confirmService, confirmDeferred;

        beforeEach(function() {
            inject(function($injector) {
                $q = $injector.get('$q');
                confirmService = $injector.get('confirmService');
            });

            $scope.statusUpdateForm = {
                $dirty: false
            };

            confirmDeferred = $q.defer();
            spyOn(confirmService, 'confirm').andReturn(confirmDeferred.promise);

            vm.$onInit();
        });

        it('should take user to the previous state if form is not dirty', function() {
            vm.cancel();

            expect(stateTrackerService.goToPreviousState).toHaveBeenCalledWith(
                'openlmis.cce.inventory', {
                    inventoryItem: inventoryItem,
                    inventoryItemId: inventoryItem.id
                }
            );
        });

        it('should take user back if form is dirty and confirmation succeeded', function() {
            $scope.statusUpdateForm.$dirty = true;

            vm.cancel();

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

        it('should not take use back if form is dirty and confirmation failed', function() {
            $scope.statusUpdateForm.$dirty = true;

            vm.cancel();

            expect(confirmService.confirm).toHaveBeenCalled();

            confirmDeferred.reject();
            $rootScope.$apply();

            expect(stateTrackerService.goToPreviousState).not.toHaveBeenCalled();
        });

    });

    describe('dismissAlert', function() {

        beforeEach(function() {
            vm.$onInit();
        });

        it('should move alert to inactive alerts with dismissed set to true if dismissal succeeded', function() {
            vm.dismissAlert(cceAlert);

            alertSaveDeferred.resolve();
            $rootScope.$apply();

            expect(vm.cceAlerts[cceAlert.device_id]).toBeDefined();
            expect(vm.cceAlerts[cceAlert.device_id].activeAlerts.length).toEqual(0);
            expect(vm.cceAlerts[cceAlert.device_id].inactiveAlerts.length).toEqual(1);
            expect(vm.cceAlerts[cceAlert.device_id].inactiveAlerts[0].alert_id).toEqual(cceAlert.alert_id);
            expect(vm.cceAlerts[cceAlert.device_id].inactiveAlerts[0].dismissed).toEqual(true);
        });

        it('should keep alert in active alerts if dismissal failed', function() {
            vm.dismissAlert(cceAlert);

            alertSaveDeferred.reject();
            $rootScope.$apply();

            expect(vm.cceAlerts[cceAlert.device_id]).toBeDefined();
            expect(vm.cceAlerts[cceAlert.device_id].activeAlerts.length).toEqual(1);
            expect(vm.cceAlerts[cceAlert.device_id].activeAlerts[0].alert_id).toEqual(cceAlert.alert_id);
            expect(vm.cceAlerts[cceAlert.device_id].activeAlerts[0].dismissed).toEqual(false);
            expect(vm.cceAlerts[cceAlert.device_id].inactiveAlerts.length).toEqual(0);
        });

    });

    describe('printAlertHistory', function() {

        it('should open report window', function() {
            vm.printAlertHistory(inventoryItem.id);

            expect($window.open).toHaveBeenCalled();
            expect(accessTokenFactory.addAccessToken).toHaveBeenCalled();
        });
    });

    function prepareSuite() {
        module('cce-inventory-item-status');

        inject(function($injector) {
            $q = $injector.get('$q');
            $state = $injector.get('$state');
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            messageService = $injector.get('messageService');
            FUNCTIONAL_STATUS = $injector.get('FUNCTIONAL_STATUS');
            REASON_FOR_NOT_WORKING = $injector.get('REASON_FOR_NOT_WORKING');
            inventoryItemService = $injector.get('inventoryItemService');
            loadingModalService = $injector.get('loadingModalService');
            notificationService = $injector.get('notificationService');
            stateTrackerService = $injector.get('stateTrackerService');
            FacilityProgramInventoryItemDataBuilder = $injector.get('FacilityProgramInventoryItemDataBuilder');
            cceAlertFactory = $injector.get('cceAlertFactory');
            CCEAlertDataBuilder = $injector.get('CCEAlertDataBuilder');
            accessTokenFactory = $injector.get('accessTokenFactory');
            cceUrlFactory = $injector.get('cceUrlFactory');
            $window = $injector.get('$window');
        });

        date = new Date();

        inventoryItem = new FacilityProgramInventoryItemDataBuilder().build();

        cceAlert = new CCEAlertDataBuilder().withDeviceId('device-1').build();
        cceAlerts = {
            'device-1': {
                activeAlerts: [cceAlert],
                inactiveAlerts: []
            }
        };

        saveDeferred = $q.defer();
        alertSaveDeferred = $q.defer();
        $scope = {};

        vm = $controller('StatusUpdateModalController', {
            inventoryItem: inventoryItem,
            $scope: $scope,
            canEdit: true,
            cceAlerts: cceAlerts
        });

        messages = {
            'cceInventoryItemStatus.functioning': 'Functioning',
            'cceInventoryItemStatus.needsSpareParts': 'Needs Spare Parts',
            'cceInventoryItemStatus.decommissioned': 'Decommissioned'
        };

        spyOn(stateTrackerService, 'goToPreviousState');
        spyOn(messageService, 'get').andCallFake(function(key) {
            return messages[key];
        });
        spyOn(inventoryItemService, 'save').andReturn(saveDeferred.promise);
        spyOn($state, 'go').andReturn();
        spyOn(cceAlertFactory, 'saveAlert').andReturn(alertSaveDeferred.promise);

        spyOn($window, 'open').andCallThrough();
        spyOn(accessTokenFactory, 'addAccessToken').andCallThrough();
    }

});
