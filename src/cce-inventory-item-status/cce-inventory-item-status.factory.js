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
     * @ngdoc service
     * @name cce-inventory-item-status.cceInventoryItemStatusFactory
     *
     * @description
     * Various helper methods for CCE inventory item status.
     */
    angular
        .module('cce-inventory-item-status')
        .factory('cceInventoryItemStatusFactory', factory);

    factory.$inject = ['$q', 'FUNCTIONAL_STATUS'];

    function factory($q, FUNCTIONAL_STATUS) {

        return {
            getFunctionalStatusClass: getFunctionalStatusClass
        };

        /**
         * @ngdoc method
         * @methodOf cce-inventory-item-status.cceInventoryItemStatusFactory
         * @name getFunctionalStatusClass
         *
         * @description
         * Gets functional status CSS class based on status name.
         *
         * @param  {String} status functional status name
         * @return {String}        functional status class for circle
         */
        function getFunctionalStatusClass(status) {
            var statusClass;

            switch (status) {
                case FUNCTIONAL_STATUS.FUNCTIONING:
                    statusClass = 'is-functioning';
                    break;
                case FUNCTIONAL_STATUS.NON_FUNCTIONING:
                case FUNCTIONAL_STATUS.AWAITING_REPAIR:
                case FUNCTIONAL_STATUS.UNSERVICABLE:
                    statusClass = 'is-non-functioning';
                    break;
                case FUNCTIONAL_STATUS.OBSOLETE:
                    statusClass = 'is-obsolete';
                    break;
            }

            return statusClass;
        }

    }
})();
