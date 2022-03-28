import { Component } from '@angular/core';
import { LayerType, MapService, UserLayerDto } from '@app/core';
import { LatLngExpression, LeafletMouseEvent, Marker } from 'leaflet';

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
        this.mapService.userLayerEdited.subscribe(layer => this.onEditUserLayer(layer));
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

    onEditUserLayer(layer: UserLayerDto): void {
        if (layer.type === LayerType.Route)
            return;

        this.mapService.createLayer(layer.type);

        var location = this.mapService.allLocations.get(layer.name);
        this.addLocation([location.latitude, location.longitude]);

        this.mapService.map.setView(this.mapService.location.getLatLng(), 12);
    }

    onMapClick(e: LeafletMouseEvent): void {
        this.addLocation(e.latlng);
    }

    //==============================================================================
    // Private Methods
    //==============================================================================
    addLocation(latlng: LatLngExpression): void {
        if (this.mapService.location)
            this.mapService.location.remove();

        this.mapService.location = new Marker(latlng, { draggable: true });
        this.mapService.location.addTo(this.mapService.map);

        this.mapService.location.setIcon(this.layerType === LayerType.Portage ?
            this.mapService.yellowMarker : this.mapService.orangeMarker);
    }
}
