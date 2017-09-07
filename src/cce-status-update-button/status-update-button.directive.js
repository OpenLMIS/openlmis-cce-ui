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
     * @restrict E
     * @name cce-status-update-button.statusUpdateButton
     *
     * @description
     * Adds a button for opening status update page.
     *
     * @example
     * Here's an example of code usage:
     * ```
     * <status-update-button inventory-item="inventoryItemObject"></status-update-button>
     * ```
     */
    angular
        .module('cce-status-update-button')
        .directive('statusUpdateButton', statusUpdateButtonDirective);

    statusUpdateButtonDirective.$inject = [];

    function statusUpdateButtonDirective() {
        var directive = {
            controller: 'StatusUpdateButtonController',
            controllerAs: 'vm',
            replace: true,
            restrict: 'E',
            scope: {
                inventoryItem: '='
            },
            templateUrl: 'cce-status-update-button/status-update-button.html',
        };
        return directive;
    }

})();
