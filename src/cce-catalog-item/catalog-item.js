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
     * @name cce-catalog-item.CatalogItem
     *
     * @description
     * Represents a single catalog item.
     */
    angular
        .module('cce-catalog-item')
        .factory('CatalogItem', CatalogItem);

    function CatalogItem() {

        return CatalogItem;

        /**
         * @ngdoc method
         * @methodOf cce-catalog-item.CatalogItem
         * @name CatalogItem
         *
         * @description
         * Creates a new instance of the CatalogItem class.
         *
         * @param  {String}  id                 the UUID of the catalog item to be updated
         * @param  {Boolean} fromPqsCatalog     true if the catalog item is from pqs catalog
         * @param  {String}  equipmentCode      the equipment code of the catalog item to be updated
         * @param  {String}  type               the type of the catalog item to be updated
         * @param  {String}  model              the model of the catalog item to be updated
         * @param  {String}  manufacturer       the manufacturer of the catalog item to be updated
         * @param  {String}  energySource       the energy source of the catalog item to be updated
         * @param  {Date}    dateOfPrequal      the date of prequal of the catalog item to be updated
         * @param  {Number}  storageTemperature the storage temperature of the catalog item to be updated
         * @param  {Number}  maxOperatingTemp   the maximum operating temperature of the catalog item to be updated
         * @param  {Number}  minOperatingTemp   the minimum operating temperature of the catalog item to be updated
         * @param  {String}  energyConsumption  the energy consumption of the catalog item to be updated
         * @param  {Number}  holdoverTime       the holdover time of the catalog item to be updated
         * @param  {Number}  grossVolume        the gross volume of the catalog item to be updated
         * @param  {Number}  netVolume          the net volume of the catalog item to be updated
         * @param  {Object}  dimensions         the dimensions of the catalog item to be updated
         * @param  {Boolean} visibleInCatalog   true if the catalog item should be visible in catalog
         * @return {Object}                     the catalog item with default options
         */
        function CatalogItem(id, fromPqsCatalog, equipmentCode, type, model, manufacturer,
            energySource, dateOfPrequal, storageTemperature, maxOperatingTemp, minOperatingTemp,
            energyConsumption, holdoverTime, grossVolume, netVolume, dimensions, visibleInCatalog, archived) {
            this.id = id,
            this.fromPqsCatalog = fromPqsCatalog;
            this.equipmentCode = equipmentCode;
            this.type = type;
            this.model = model;
            this.manufacturer = manufacturer;
            this.energySource = energySource;
            this.dateOfPrequal = dateOfPrequal;
            this.storageTemperature = storageTemperature;
            this.maxOperatingTemp = maxOperatingTemp;
            this.minOperatingTemp = minOperatingTemp;
            this.energyConsumption = energyConsumption;
            this.holdoverTime = holdoverTime;
            this.grossVolume = grossVolume;
            this.netVolume = netVolume;
            this.dimensions = dimensions;
            this.visibleInCatalog = visibleInCatalog;
            this.archived = archived;
        }

    }

})();
