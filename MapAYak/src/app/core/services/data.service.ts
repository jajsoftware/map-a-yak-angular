import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CoordinateDto } from '../dtos/map/coordinate.dto';
import { LocationDto } from '../dtos/map/location.dto';
import { RouteDto } from '../dtos/map/route.dto';
import { UserLayerDto } from '../dtos/map/user-layer.dto';
import { LayerType, LocationType } from '../enums/core.enums';
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

    getUserLayers(): Observable<UserLayerDto[]> {
        return this.http.get<UserLayerDto[]>('/api/Data/UserLayers').pipe(
            tap(layers => layers.forEach(layer => layer.markerPath = this.getMarkerPath(layer.type))));
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

    update(layerType: LayerType, name: string, description: string): Observable<unknown> {
        switch (layerType) {

            case LayerType.Route:
                return this.updateRoute(name, description);

            case LayerType.Portage:
                return this.updateLocation(LocationType.Portage, name, description);

            case LayerType.Campsite:
                return this.updateLocation(LocationType.Campsite, name, description);
        }
    }

    delete(layerType: LayerType, name: string): Observable<unknown> {
        switch (layerType) {

            case LayerType.Route:
                return this.deleteRoute(name);

            case LayerType.Portage:
            case LayerType.Campsite:
                return this.deleteLocation(name);
        }
    }

    //==============================================================================
    // Private Methods
    //==============================================================================
    saveRoute(name: string, description: string): Observable<unknown> {
        var dto = this.getRouteDto(name, description);

        return this.http.post('/api/Data/SaveRoute', dto);
    }

    saveLocation(type: LocationType, name: string, description: string): Observable<unknown> {
        var dto = this.getLocationDto(type, name, description);

        return this.http.post('/api/Data/SaveLocation', dto);
    }

    updateRoute(name: string, description: string): Observable<unknown> {
        var dto = this.getRouteDto(name, description);

        return this.http.post('/api/Data/UpdateRoute', dto);
    }

    updateLocation(type: LocationType, name: string, description: string): Observable<unknown> {
        var dto = this.getLocationDto(type, name, description);

        return this.http.post('/api/Data/UpdateLocation', dto);
    }

    deleteRoute(name: string): Observable<unknown> {
        return this.http.get(`/api/Data/DeleteRoute?name=${name}`);
    }

    deleteLocation(name: string): Observable<unknown> {
        return this.http.get(`/api/Data/DeleteLocation?name=${name}`);
    }

    getRouteDto(name: string, description: string): RouteDto {
        return new RouteDto({
            userName: this.accountService.userName,
            name: name,
            description: description,
            coordinates: this.mapService.coordinates.map(c => new CoordinateDto({
                latitude: c.getLatLng().lat,
                longitude: c.getLatLng().lng
            }))
        });
    }

    getLocationDto(type: LocationType, name: string, description: string): LocationDto {
        return new LocationDto({
            userName: this.accountService.userName,
            type: type,
            name: name,
            description: description,
            latitude: this.mapService.location.getLatLng().lat,
            longitude: this.mapService.location.getLatLng().lng
        });
    }

    getMarkerPath(type: LayerType) {
        switch (type) {

            case LayerType.Route:
                return 'assets/blue-marker.png';

            case LayerType.Portage:
                return 'assets/yellow-marker.png';

            case LayerType.Campsite:
                return 'assets/orange-marker.png';
        }
    }
}
