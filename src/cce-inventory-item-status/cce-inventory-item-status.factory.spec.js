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

describe('cceInventoryItemStatusFactory', function () {

    var FUNCTIONAL_STATUS, cceInventoryItemStatusFactory;

    beforeEach(function() {
        module('cce-inventory-item-status');

        inject(function($injector) {
            FUNCTIONAL_STATUS = $injector.get('FUNCTIONAL_STATUS');
            cceInventoryItemStatusFactory = $injector.get('cceInventoryItemStatusFactory');
        });
    });

    describe('getFunctionalStatusClass', function() {

        it('should return is-functioning class', function() {
            expect(cceInventoryItemStatusFactory.getFunctionalStatusClass(FUNCTIONAL_STATUS.FUNCTIONING)).toEqual('is-functioning');
        });

        it('should return is-non-functioning class', function() {
            expect(cceInventoryItemStatusFactory.getFunctionalStatusClass(FUNCTIONAL_STATUS.NON_FUNCTIONING)).toEqual('is-non-functioning');
            expect(cceInventoryItemStatusFactory.getFunctionalStatusClass(FUNCTIONAL_STATUS.AWAITING_REPAIR)).toEqual('is-non-functioning');
            expect(cceInventoryItemStatusFactory.getFunctionalStatusClass(FUNCTIONAL_STATUS.UNSERVICABLE)).toEqual('is-non-functioning');
        });

        it('should return is-obsolete class', function() {
            expect(cceInventoryItemStatusFactory.getFunctionalStatusClass(FUNCTIONAL_STATUS.OBSOLETE)).toEqual('is-obsolete');
        });
    });
});
