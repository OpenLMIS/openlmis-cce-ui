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

describe('FACILITY_CCE_STATUS', function() {

    var FACILITY_CCE_STATUS;

    beforeEach(function() {
        module('facility-cce-status');

        inject(function($injector) {
            FACILITY_CCE_STATUS = $injector.get('FACILITY_CCE_STATUS');
        });
    });

    describe('getLabel', function() {

        it('should return label for valid status', function() {
            expect(
                FACILITY_CCE_STATUS.getLabel('All_FUNCTIONING')
            ).toEqual('facilityCceStatus.allFunctioning');

            expect(
                FACILITY_CCE_STATUS.getLabel('NOT_FULLY_FUNCTIONING')
            ).toEqual('facilityCceStatus.notFullyFunctioning');

            expect(
                FACILITY_CCE_STATUS.getLabel('NOT_FUNCTIONING')
            ).toEqual('facilityCceStatus.notFunctioning');

            expect(
                FACILITY_CCE_STATUS.getLabel('UNKNOWN')
            ).toEqual('facilityCceStatus.unknown');

            expect(
                FACILITY_CCE_STATUS.getLabel('LOADING')
            ).toEqual('facilityCceStatus.loading');

            expect(
                FACILITY_CCE_STATUS.getLabel('NO_CCE')
            ).toEqual('facilityCceStatus.noCce');
        });

        it('should throw exception for invalid status', function() {
            expect(function() {
                FACILITY_CCE_STATUS.getLabel('NON_EXISTENT_SOURCE');
            }).toThrow('Invalid status');

            expect(function() {
                FACILITY_CCE_STATUS.getLabel(undefined);
            }).toThrow('Invalid status');

            expect(function() {
                FACILITY_CCE_STATUS.getLabel(null);
            }).toThrow('Invalid status');

            expect(function() {
                FACILITY_CCE_STATUS.getLabel('');
            }).toThrow('Invalid status');
        });

    });

    describe('getClass', function() {

        it('should return css class for valid status', function () {
            expect(
                FACILITY_CCE_STATUS.getClass('All_FUNCTIONING')
            ).toEqual('is-functioning');

            expect(
                FACILITY_CCE_STATUS.getClass('NOT_FULLY_FUNCTIONING')
            ).toEqual('is-not-fully-functioning');

            expect(
                FACILITY_CCE_STATUS.getClass('NOT_FUNCTIONING')
            ).toEqual('is-non-functioning');

            expect(
                FACILITY_CCE_STATUS.getClass('UNKNOWN')
            ).toEqual('is-unknown');

            expect(
                FACILITY_CCE_STATUS.getClass('LOADING')
            ).toEqual('is-loading-status');

            expect(
                FACILITY_CCE_STATUS.getClass('NO_CCE')
            ).toEqual('no-cce');
        });

        it('should throw exception for invalid status', function () {
            expect(function () {
                FACILITY_CCE_STATUS.getClass('NON_EXISTENT_SOURCE');
            }).toThrow('Invalid status');

            expect(function () {
                FACILITY_CCE_STATUS.getClass(undefined);
            }).toThrow('Invalid status');

            expect(function () {
                FACILITY_CCE_STATUS.getClass(null);
            }).toThrow('Invalid status');

            expect(function () {
                FACILITY_CCE_STATUS.getClass('');
            }).toThrow('Invalid status');
        });
    });

});
