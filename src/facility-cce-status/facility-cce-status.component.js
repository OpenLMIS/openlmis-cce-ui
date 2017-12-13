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

(function() {

    'use strict';

    /**
     * @ngdoc directive
     * @name facility-cce-status:facilityCceStatus
     *
     * @description
     * The CCE status component provides facility CCE status data. The component has the following
     * states:
     * "All functioning" if all CCE inventory items are functional.
     * "Not fully functioning" if at least one CCE inventory item is functioning and at least
     * one CCE inventory item is not functioning
     * "Not functioning" if no CCE inventory items are functional
     * "Loading" displayed while the facility CCE Status component is loading data from the
     * services
     * "Unknown" displayed if the Facility CCE Status component failed to load information
     * from the CCE services or the current user doesn't have permission to view CCE status for
     * the specific facility.
     *
     * @example
     * ```
     * <facility-cce-status facility="facility"></facility-cce-status>
     * ```
     */
    angular
        .module('facility-cce-status')
        .component('facilityCceStatus', {
            controller: 'CceStatusController',
            controllerAs: 'vm',
            templateUrl: 'facility-cce-status/facility-cce-status.html',
            bindings: {
                facility: '='
            }
        });
})();
