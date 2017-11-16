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
        .module('cce-catalog-item')
        .factory('CatalogItemBuilder', CatalogItemBuilder);

    CatalogItemBuilder.$inject = ['CatalogItem'];

    function CatalogItemBuilder(CatalogItem) {

        CatalogItemBuilder.prototype.build = build;
        CatalogItemBuilder.prototype.withEnergySource = withEnergySource;

        return CatalogItemBuilder;

        function CatalogItemBuilder() {
            this.id = 'df135ec9-8dda-4f6b-aac0-4ae69c684990',
            this.fromPqsCatalog = true;
            this.equipmentCode = 'E003/002';
            this.type = 'Freezer';
            this.model = 'HBD 116*';
            this.manufacturer = 'Haier';
            this.energySource = 'ELECTRIC';
            this.dateOfPrequal = 2009;
            this.storageTemperature = 'MINUS8';
            this.maxOperatingTemp = 45;
            this.minOperatingTemp = 0;
            this.energyConsumption = '0.38kW/day';
            this.holdoverTime = 2;
            this.grossVolume = 121;
            this.netVolume = 12;
            this.dimensions = {};
            this.visibleInCatalog = true;
            this.archived = false;
        }

        function withEnergySource(newEnergySource) {
            this.energySource = newEnergySource;
            return this;
        }

        function build() {
            return new CatalogItem(
                this.id,
                this.fromPqsCatalog,
                this.equipmentCode,
                this.type,
                this.model,
                this.manufacturer,
                this.energySource,
                this.dateOfPrequal,
                this.storageTemperature,
                this.maxOperatingTemp,
                this.minOperatingTemp,
                this.energyConsumption,
                this.holdoverTime,
                this.grossVolume,
                this.netVolume,
                this.dimensions,
                this.visibleInCatalog,
                this.archived
            );
        }

    }

})();
