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
        .factory('InventoryItemDataBuilder', InventoryItemDataBuilder);

    InventoryItemDataBuilder.$inject = ['InventoryItem', 'ObjectReferenceDataBuilder',
        'CatalogItemDataBuilder',  'FacilityDataBuilder', 'ProgramDataBuilder'];

    function InventoryItemDataBuilder(InventoryItem, ObjectReferenceDataBuilder,
        CatalogItemDataBuilder, FacilityDataBuilder, ProgramDataBuilder) {

        InventoryItemDataBuilder.prototype.build = build;
        InventoryItemDataBuilder.prototype.buildBase = buildBase;
        InventoryItemDataBuilder.prototype.withCatalogItem = withCatalogItem;
        InventoryItemDataBuilder.prototype.withDecommissionDate = withDecommissionDate;
        InventoryItemDataBuilder.prototype.withFacility = withFacility;
        InventoryItemDataBuilder.prototype.withFunctionalStatus = withFunctionalStatus;
        InventoryItemDataBuilder.prototype.withId = withId;
        InventoryItemDataBuilder.prototype.withoutId = withoutId;
        InventoryItemDataBuilder.prototype.withProgram = withProgram;
        InventoryItemDataBuilder.prototype.withYearOfInstallation = withYearOfInstallation;
        InventoryItemDataBuilder.prototype.withYearOfWarrantyExpiry = withYearOfWarrantyExpiry;

        return InventoryItemDataBuilder;

        function InventoryItemDataBuilder() {
            this.source = {
                id : '35b8eeca-bfad-47f3-b966-c9cb726b872f',
                facility: new ObjectReferenceDataBuilder().withId('97546f93-ac93-435f-a437-cd629deb7d6d').build(),
                catalogItem: new CatalogItemDataBuilder().build(),
                program: new ObjectReferenceDataBuilder().withId('418bdc1d-c303-4bd0-b2d3-d8901150a983').build(),
                equipmentTrackingId: 'tracking-id',
                referenceName: 'Reference Name',
                yearOfInstallation: 2010,
                yearOfWarrantyExpiry: 2020,
                source: 'source',
                functionalStatus: 'FUNCTIONING',
                reasonNotWorkingOrNotInUse: 'NOT_APPLICABLE',
                utilization: 'ACTIVE',
                voltageStabilizer: 'YES',
                backupGenerator: 'YES',
                voltageRegulator: 'YES',
                manualTemperatureGauge: 'BUILD_IN',
                remoteTemperatureMonitor: 'BUILD_IN',
                remoteTemperatureMonitorId: 'monitor-id',
                additionalNotes: 'notes',
                decommissionDate: '2017-01-01',
                modifiedDate: '2017-10-10',
                lastModifier: new CatalogItemDataBuilder().build()
            };
            this.facility = new FacilityDataBuilder().build();
            this.program = new ProgramDataBuilder().build();
        }

        function withAdditionalNotes(newNotes) {
            this.source.additionalNotes = newNotes;
            return this;
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

        function buildBase() {
            return new InventoryItem(
                this.source
            );
        }

    }

})();
