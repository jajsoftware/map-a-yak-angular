import { Injectable } from '@angular/core';
import { Icon, LatLng, Map as LeafletMap, Marker } from 'leaflet';
import { Subject } from 'rxjs';
import { LocationDto } from '../dtos/map/location.dto';
import { RouteDto } from '../dtos/map/route.dto';
import { UserLayerDto } from '../dtos/map/user-layer.dto';
import { LayerType } from '../enums/core.enums';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    //==============================================================================
    // Events
    //==============================================================================
    public layerCreated: Subject<LayerType>;
    public userLayerViewed: Subject<UserLayerDto>;
    public userLayerEdited: Subject<UserLayerDto>;
    public userLayerDeleted: Subject<UserLayerDto>;

    //==============================================================================
    // Properties
    //==============================================================================
    public map: LeafletMap;
    public blueMarker: Icon;
    public greenMarker: Icon;
    public redMarker: Icon;
    public yellowMarker: Icon;
    public orangeMarker: Icon;
    public coordinates: Marker[];
    public location: Marker;
    public allRoutes: Map<string, RouteDto>;
    public allLocations: Map<string, LocationDto>;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor() {
        this.coordinates = [];
        this.allRoutes = new Map<string, RouteDto>();
        this.allLocations = new Map<string, LocationDto>();

        this.layerCreated = new Subject<LayerType>();
        this.userLayerViewed = new Subject<UserLayerDto>();
        this.userLayerEdited = new Subject<UserLayerDto>();
        this.userLayerDeleted = new Subject<UserLayerDto>();
    }

    //==============================================================================
    // Public Methods
    //==============================================================================
    createLayer(layerType: LayerType): void {
        this.layerCreated.next(layerType);
    }

    viewUserLayer(layer: UserLayerDto): void {
        this.userLayerViewed.next(layer);
    }

    editUserLayer(layer: UserLayerDto): void {
        this.userLayerEdited.next(layer);
    }

    deleteUserLayer(layer: UserLayerDto): void {
        this.userLayerDeleted.next(layer);
    }

    getDistance(coordinates: LatLng[]): string {
        var distance = 0;
        for (var i = 0; i < coordinates.length - 1; i++)
            distance += coordinates[i].distanceTo(coordinates[i + 1]);

        return (distance / 1609.34).toFixed(2); // Converts meters to miles and rounds.
    }
}
