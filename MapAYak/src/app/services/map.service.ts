import { Injectable } from '@angular/core';
import { Icon, LatLng, Map, Marker } from 'leaflet';
import { Subject } from 'rxjs';
import { LayerType } from '../models/enums';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    //==============================================================================
    // Events
    //==============================================================================
    public layerCreated: Subject<LayerType>;

    //==============================================================================
    // Properties
    //==============================================================================
    public map: Map;
    public blueMarker: Icon;
    public greenMarker: Icon;
    public redMarker: Icon;
    public yellowMarker: Icon;
    public orangeMarker: Icon;
    public coordinates: Marker[];
    public location: Marker;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor() {
        this.coordinates = [];

        this.layerCreated = new Subject<LayerType>();
    }

    //==============================================================================
    // Public Methods
    //==============================================================================
    createLayer(layerType: LayerType): void {
        this.layerCreated.next(layerType);
    }

    getDistance(coordinates: LatLng[]): string {
        var distance = 0;
        for (var i = 0; i < coordinates.length - 1; i++)
            distance += coordinates[i].distanceTo(coordinates[i + 1]);

        return (distance / 1609.34).toFixed(2); // Converts meters to miles and rounds.
    }
}
