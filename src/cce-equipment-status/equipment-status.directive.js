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
     * @name cce-equipment-status.equipmentStatus
     *
     * @description
     * Renders an equipment status element displaying current item status and allowing user to
     * update it through a modal.
     */
    angular
        .module('cce-equipment-status')
        .directive('equipmentStatus', equipmentStatus);

    equipmentStatus.$inject = [];

    function equipmentStatus() {
        var directive = {
            controller: 'EquipmentStatusController',
            controllerAs: 'vm',
            replace: 'true',
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'cce-equipment-status/equipment-status.html'
        };
        return directive;
    }

})();
