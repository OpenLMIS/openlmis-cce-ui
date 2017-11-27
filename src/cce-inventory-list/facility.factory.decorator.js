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
     * @name cce-inventory-list.facilityFactory
     *
     * @description
     * Decorates the facility factory with method for getting supervised facilities based on permission strings and on right.
     */
    angular.module('cce-inventory-list')
        .config(config);

    config.$inject = ['$provide'];

    function config($provide) {
        $provide.decorator('facilityFactory', decorate);
    }

    decorate.$inject = ['$q', '$delegate', 'permissionService', 'facilityService', 'authorizationService'];

    function decorate($q, $delegate, permissionService, facilityService, authorizationService) {
        $delegate.getSupervisedFacilitiesBasedOnRights = getSupervisedFacilitiesBasedOnRights;

        return $delegate;

        /**
         * @ngdoc method
         * @methodOf cce-inventory-list.facilityFactory
         * @name getSupervisedFacilitiesBasedOnRight
         *
         * @description
         * Returns user supervised facilities based on permission strings and passed rights.
         *
         * @param  {Array} rights rights for filtering
         * @return {Array}        supervised facilities based on given rights
         */
        function getSupervisedFacilitiesBasedOnRights(rights) {
            var user = authorizationService.getUser();

            return $q.all([
                permissionService.load(user.user_id),
                facilityService.getAllMinimal()
            ])
            .then(function(responses) {
                var permissionStrings = responses[0],
                    minimalFacilities = responses[1];

                var filteredPermissionStrings = permissionStrings.filter(function(permissionString) {
                    return rights.indexOf(permissionString.right) >= 0;
                });

                var facilityIds = filteredPermissionStrings.map(function(permissionString) {
                    return permissionString.facilityId;
                });

                return minimalFacilities.filter(function(facility) {
                    return facilityIds.indexOf(facility.id) >= 0;
                });
            });
        }
    }
})();
