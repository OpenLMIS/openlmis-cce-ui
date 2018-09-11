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

    angular
        .module('cce-inventory-item')
        .factory('FacilityProgramInventoryItemDataBuilder', FacilityProgramInventoryItemDataBuilder);

    FacilityProgramInventoryItemDataBuilder.$inject = ['InventoryItem', 'FacilityDataBuilder',
        'ProgramDataBuilder', 'InventoryItemDataBuilder'];

    function FacilityProgramInventoryItemDataBuilder(InventoryItem, FacilityDataBuilder,
                                                     ProgramDataBuilder, InventoryItemDataBuilder) {

        FacilityProgramInventoryItemDataBuilder.prototype.build = build;
        FacilityProgramInventoryItemDataBuilder.prototype.withCatalogItem = withCatalogItem;
        FacilityProgramInventoryItemDataBuilder.prototype.withDecommissionDate = withDecommissionDate;
        FacilityProgramInventoryItemDataBuilder.prototype.withFacility = withFacility;
        FacilityProgramInventoryItemDataBuilder.prototype.withFunctionalStatus = withFunctionalStatus;
        FacilityProgramInventoryItemDataBuilder.prototype.withId = withId;
        FacilityProgramInventoryItemDataBuilder.prototype.withoutId = withoutId;
        FacilityProgramInventoryItemDataBuilder.prototype.withProgram = withProgram;
        FacilityProgramInventoryItemDataBuilder.prototype.withYearOfInstallation = withYearOfInstallation;
        FacilityProgramInventoryItemDataBuilder.prototype.withYearOfWarrantyExpiry = withYearOfWarrantyExpiry;

        return FacilityProgramInventoryItemDataBuilder;

        function FacilityProgramInventoryItemDataBuilder() {
            this.facility = new FacilityDataBuilder().build();
            this.program = new ProgramDataBuilder().build();
            this.source = new InventoryItemDataBuilder().withFacilityId(this.facility.id)
                .withProgramId(this.program.id)
                .build();
        }

        function withCatalogItem(newCatalogItem) {
            this.source.catalogItem = newCatalogItem;
            return this;
        }

        function withDecommissionDate(newDate) {
            this.source.decommissionDate = newDate;
            return this;
        }

        function withFacility(newFacility) {
            this.facility = newFacility;
            return this;
        }

        function withFunctionalStatus(newStatus) {
            this.source.functionalStatus = newStatus;
            return this;
        }

        function withId(newId) {
            this.source.id = newId;
            return this;
        }

        function withoutId() {
            this.source.id = undefined;
            return this;
        }

        function withProgram(newProgram) {
            this.program = newProgram;
            return this;
        }

        function withYearOfInstallation(newYear) {
            this.source.yearOfInstallation = newYear;
            return this;
        }

        function withYearOfWarrantyExpiry(newYear) {
            this.source.yearOfWarrantyExpiry = newYear;
            return this;
        }

        function build() {
            return new InventoryItem(
                this.source,
                this.facility,
                this.program
            );
        }

    }

})();
