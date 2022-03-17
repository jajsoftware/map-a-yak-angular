import { Component } from '@angular/core';
import { Marker, LeafletMouseEvent, LatLng } from 'leaflet';
import { LayerType } from '../models/enums';
import { MapService } from '../services/map.service';

@Component({
    selector: 'create-location-component',
    template: ''
})
export class CreateLocationComponent {

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly mapService: MapService;
    private layerType: LayerType;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(mapService: MapService) {
        this.mapService = mapService;

        this.mapService.layerCreated.subscribe(layerType => this.onLayerCreated(layerType));
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onLayerCreated(layerType: LayerType): void {
        if (layerType === LayerType.Route)
            return;

        this.mapService.map.on('click', e => this.onMapClick(e as LeafletMouseEvent));
        this.layerType = layerType;
    }

    onMapClick(e: LeafletMouseEvent): void {
        this.addLocation(e.latlng);
    }

    //==============================================================================
    // Private Methods
    //==============================================================================
    addLocation(latlng: LatLng): void {
        if (this.mapService.location)
            this.mapService.location.remove();

        this.mapService.location = new Marker(latlng, { draggable: true });
        this.mapService.location.addTo(this.mapService.map);

        this.mapService.location.setIcon(this.layerType === LayerType.Portage ?
            this.mapService.yellowMarker : this.mapService.orangeMarker);
    }
}
