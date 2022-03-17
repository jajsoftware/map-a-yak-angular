import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinate } from '../models/coordinate';
import { LayerType, LocationType } from '../models/enums';
import { Location } from '../models/location';
import { Route } from '../models/route';
import { MapService } from './map.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly http: HttpClient;
    private readonly mapService: MapService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(http: HttpClient, mapService: MapService) {
        this.http = http;
        this.mapService = mapService;
    }

    //==============================================================================
    // Public Methods
    //==============================================================================
    getRoutes(): Observable<Route[]> {
        return this.http.get<Route[]>('http://localhost:5253/data/routes');
    }

    getLocations(): Observable<Location[]> {
        return this.http.get<Location[]>('http://localhost:5253/data/locations');
    }

    save(layerType: LayerType, name: string, description: string): Observable<unknown> {
        switch (layerType) {

            case LayerType.Route:
                return this.saveRoute(name, description);

            case LayerType.Portage:
                return this.saveLocation(LocationType.Portage, name, description);

            case LayerType.Campsite:
                return this.saveLocation(LocationType.Campsite, name, description);
        }
    }

    //==============================================================================
    // Private Methods
    //==============================================================================
    saveRoute(name: string, description: string): Observable<unknown> {
        var route = new Route();

        route.UserId = 'TO-DO';
        route.Name = name;
        route.Description = description;

        route.Coordinates = [];
        for (var marker of this.mapService.coordinates) {
            var coordinate = new Coordinate();

            var latlng = marker.getLatLng();
            coordinate.Latitude = latlng.lat;
            coordinate.Longitude = latlng.lng;

            route.Coordinates.push(coordinate);
        }

        return this.http.post('http://localhost:5253/data/saveRoute', route);
    }

    saveLocation(locationType: LocationType, name: string, description: string): Observable<unknown> {
        var location = new Location();

        location.UserId = 'TO-DO';
        location.LocationType = locationType;
        location.Name = name;
        location.Description = description;

        var latlng = this.mapService.location.getLatLng();
        location.Latitude = latlng.lat;
        location.Longitude = latlng.lng;

        return this.http.post('http://localhost:5253/data/saveLocation', location);
    }
}
