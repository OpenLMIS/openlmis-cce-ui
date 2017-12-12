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
     * @ngdoc object
     * @name cce-status.STATUS
     *
     * @description
     * Contains all possible cce statuses.
     */
    angular
        .module('cce-status')
        .constant('STATUS', statuses());

    function statuses() {
        var STATUS = {
                getLabel: getLabel,
                getClass: getClass,
                All_FUNCTIONING: 'All_FUNCTIONING',
                NOT_FULLY_FUNCTIONING: 'NOT_FULLY_FUNCTIONING',
                NOT_FUNCTIONING: 'NOT_FUNCTIONING',
                UNKNOWN: 'UNKNOWN',
                LOADING: 'LOADING'
            },
            labels = {
                All_FUNCTIONING: 'cceStatus.allFunctioning',
                NOT_FULLY_FUNCTIONING: 'cceStatus.notFullyFunctioning',
                NOT_FUNCTIONING: 'cceStatus.notFunctioning',
                UNKNOWN: 'cceStatus.unknown',
                LOADING: 'cceStatus.loading'
            };

        return STATUS;

        /**
         * @ngdoc method
         * @methodOf cce-status.STATUS
         * @name getLabel
         *
         * @description
         * Returns the label for the given status.
         *
         * @param   {String}    status  the status to get the label for
         * @return  {String}            the label for the given status
         */
        function getLabel(status) {
            var label = labels[status];

            if (!label) {
                throw 'Invalid status';
            }

            return label;
        }


        /**
         * @ngdoc method
         * @methodOf cce-status.STATUS
         * @name getClass
         *
         * @description
         * Returns a CSS class name defining the state of the status.
         *
         * @param   {String}    status  the status to get the class for
         * @return  {String}            the CSS class defining the state of the status
         */
        function getClass(status) {
            var statusClass;

            switch (status) {
                case STATUS.All_FUNCTIONING:
                    statusClass = 'is-functioning';
                    break;
                case STATUS.NOT_FULLY_FUNCTIONING:
                    statusClass = 'is-not-fully-functioning';
                    break;
                case STATUS.NOT_FUNCTIONING:
                    statusClass = 'is-non-functioning';
                    break;
                case STATUS.UNKNOWN:
                    statusClass = 'is-unknown';
                    break;
                case STATUS.LOADING:
                    statusClass = 'is-loading';
                    break;
            }

            return statusClass;
        }
    }

})();
