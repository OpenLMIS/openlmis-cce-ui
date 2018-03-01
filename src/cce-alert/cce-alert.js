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

(function(){

    'use strict';

    /**
     * @ngdoc service
     * @name cce-alert.CCEAlert
     *
     * @description
     * Represents a single CCE alert in the OpenLMIS system.
     */
    angular
        .module('cce-alert')
        .factory('CCEAlert', factory);

    factory.$inject = ['$q'];

    function factory($q) {

        CCEAlert.prototype.save = save;

        return CCEAlert;

        /**
         * @ngdoc method
         * @methodOf cce-alert.CCEAlert
         * @name CCEAlert
         *
         * @description
         * Creates an instance of the CCEAlert class.
         *
         * @param  {Object}             json        the JSON representation of the CCE Alert
         * @param  {CCEAlertRepository} repository  the instance of the
         *                                          CCEAlertRepository class
         */
        function CCEAlert(json, repository) {
            angular.copy(json, this);
            this.repository = repository;
        }

        /**
         * @ngdoc method
         * @methodOf cce-alert.CCEAlert
         * @name save
         *
         * @description
         * Updates the CCE alert in the repository.
         *
         * @return {Promise}    the promise resolved when save was successful or rejected if it was
         *                      not
         */
        function save() {
            return this.repository.save(this);
        }
    }

})();
