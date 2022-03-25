import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoordinateDto } from '../dtos/data/coordinate.dto';
import { LocationDto } from '../dtos/data/location.dto';
import { RouteDto } from '../dtos/data/route.dto';
import { LayerType, LocationType } from '../enums/enums';
import { AccountService } from './account.service';
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
    private readonly accountService: AccountService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(http: HttpClient, mapService: MapService, accountService: AccountService) {
        this.http = http;
        this.mapService = mapService;
        this.accountService = accountService;
    }

    //==============================================================================
    // Public Methods
    //==============================================================================
    getRoutes(): Observable<RouteDto[]> {
        return this.http.get<RouteDto[]>('/api/Data/Routes');
    }

    getLocations(): Observable<LocationDto[]> {
        return this.http.get<LocationDto[]>('/api/Data/Locations');
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
        var route = new RouteDto();

        route.userName = this.accountService.userName;
        route.name = name;
        route.description = description;

        route.coordinates = [];
        for (var marker of this.mapService.coordinates) {
            var coordinate = new CoordinateDto();

            var latlng = marker.getLatLng();
            coordinate.latitude = latlng.lat;
            coordinate.longitude = latlng.lng;

            route.coordinates.push(coordinate);
        }

        return this.http.post('/api/Data/SaveRoute', route);
    }

    saveLocation(type: LocationType, name: string, description: string): Observable<unknown> {
        var location = new LocationDto();

        location.userName = this.accountService.userName;
        location.type = type;
        location.name = name;
        location.description = description;

        var latlng = this.mapService.location.getLatLng();
        location.latitude = latlng.lat;
        location.longitude = latlng.lng;

        return this.http.post('/api/Data/SaveLocation', location);
    }
}
