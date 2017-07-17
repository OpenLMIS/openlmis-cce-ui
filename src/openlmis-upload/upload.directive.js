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
     * @restrict A
     * @name openlmis-upload.directive:fileUpload
     *
     * @description
     * placeholder
     *
     * @example
     * <input type="file" file-upload/>
     */
    angular
        .module('openlmis-upload')
        .directive('fileUpload', directive);

    function directive() {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, ngModelController) {
            element.on('change', function(evt) {
                scope.$apply(function() {
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        scope.$apply(function() {
                            ngModelController.$setViewValue(event.target.result);
                        });
                    };
                    reader.readAsDataURL(evt.target.files[0]);
                });
            });
        }
    }

})();
