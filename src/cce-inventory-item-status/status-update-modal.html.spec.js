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

    describe('Current Status fieldset', function() {

        it('should be hidden if current status is not set', function() {

        });

    });

    describe('Functional Status select', function() {

        it('should be required', function() {

        });

    });

    describe('Reason not working or not in use select', function() {

        it('should clear after functional status changed', function() {

        });

        it('should be hidden for FUNCTIONING', function() {

        });

        it('should be required for NON_FUNCTIONING', function() {

        });

        it('should be required for AWAITING_REPAIR', function() {

        });

        it('should be required for UNSERVICABLE', function() {

        });

        it('should be required for OBSOLETE', function() {

        });

    });

    describe('Decommission Date input', function() {

        it('should clear after functional status changed', function() {

        });

        it('should be hidden for FUNCTIONING', function() {

        });

        it('should be hidden for NON_FUNCTIONING', function() {

        });

        it('should be hidden for AWAITING_REPAIR', function() {

        });

        it('should be hidden for UNSERVICABLE', function() {

        });

        it('should be required for OBSOLETE', function() {

        });

    });

});
