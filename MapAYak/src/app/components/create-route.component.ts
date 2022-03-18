import { Component } from '@angular/core';
import { LatLng, Layer, LeafletMouseEvent, Marker, Polyline } from 'leaflet';
import { LayerType } from '../models/enums';
import { MapService } from '../services/map.service';

@Component({
    selector: 'create-route-component',
    templateUrl: './create-route.component.html'
})
export class CreateRouteComponent {

    //==============================================================================
    // Properties
    //==============================================================================
    public distance: string;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly mapService: MapService;
    private route: Polyline;
    private selectedCoordinate: Marker;

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
        if (layerType !== LayerType.Route)
            return;

        this.mapService.map.on('click', e => this.onMapClick(e as LeafletMouseEvent));
        this.distance = "0.00";
    }

    onMapClick(e: LeafletMouseEvent): void {
        this.addCoordinate(e.latlng);
        this.updateRoute();
    }

    onGetCoordinateHtml(layer: Layer): string {
        this.selectedCoordinate = layer as Marker;
        return '<a onclick="ng.getComponent(document.getElementsByTagName(\'create-route-component\')[0]).onRemoveCoordinate()" class="text-danger">Remove</a>';
    }

    onRemoveCoordinate(): void {
        this.removeCoordinate(this.selectedCoordinate);
        this.updateRoute();
    }

    //==============================================================================
    // Private Methods
    //==============================================================================
    addCoordinate(latlng: LatLng): void {
        var coordinate = new Marker(latlng, { draggable: true });
        coordinate.addTo(this.mapService.map);

        coordinate.on('move', e => this.updateRoute());
        coordinate.bindPopup(layer => this.onGetCoordinateHtml(layer));

        coordinate.setIcon(this.mapService.coordinates.length === 0 ? this.mapService.greenMarker : this.mapService.redMarker);
        if (this.mapService.coordinates.length > 1)
            this.mapService.coordinates[this.mapService.coordinates.length - 1].setIcon(this.mapService.blueMarker);

        this.mapService.coordinates.push(coordinate);
    }

    removeCoordinate(coordinate: Marker): void {
        var index = this.mapService.coordinates.indexOf(coordinate);
        this.mapService.coordinates.splice(index, 1);

        coordinate.remove();

        if (index == 0 && this.mapService.coordinates.length > 0)
            this.mapService.coordinates[0].setIcon(this.mapService.greenMarker);
        else if (index == this.mapService.coordinates.length && this.mapService.coordinates.length > 1)
            this.mapService.coordinates[index - 1].setIcon(this.mapService.redMarker);
    }

    updateRoute(): void {
        if (this.route)
            this.route.remove();

        var coordinates = this.mapService.coordinates.map(c => c.getLatLng());

        var lineOptions = {
            color: 'blue',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
        };

        this.route = new Polyline(coordinates, lineOptions).addTo(this.mapService.map);

        this.distance = this.mapService.getDistance(coordinates);
    }
}