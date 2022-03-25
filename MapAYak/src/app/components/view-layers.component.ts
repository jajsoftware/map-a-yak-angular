import { AfterViewInit, Component } from '@angular/core';
import { LatLng, LeafletMouseEvent, Marker, Polyline } from 'leaflet';
import { LocationDto } from '../dtos/data/location.dto';
import { RouteDto } from '../dtos/data/route.dto';
import { LayerType, LocationType } from '../enums/enums';
import { DataService } from '../services/data.service';
import { MapService } from '../services/map.service';

@Component({
    selector: 'view-layers-component',
    templateUrl: './view-layers.component.html'
})
export class ViewLayersComponent implements AfterViewInit {

    //==============================================================================
    // Data Members
    //==============================================================================
    public selectedLayer: any;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly mapService: MapService;
    private readonly dataService: DataService;
    private routes: Map<Marker, RouteDto>;
    private locations: Map<Marker, LocationDto>;
    private selectedRouteMarker: Marker;
    private selectedRouteEndMarker: Marker;
    private selectedRouteLine: Polyline;
    private selectedLocationMarker: Marker;
    private previewLine: Polyline;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(mapService: MapService, dataService: DataService) {
        this.mapService = mapService;
        this.dataService = dataService;
        this.routes = new Map<Marker, RouteDto>();
        this.locations = new Map<Marker, LocationDto>();

        this.mapService.layerCreated.subscribe(layerType => this.onLayerCreated(layerType));
    }

    //==============================================================================
    // Overrides
    //==============================================================================
    ngAfterViewInit(): void {
        this.dataService.getRoutes().subscribe(routes => this.drawRoutes(routes));
        this.dataService.getLocations().subscribe(locations => this.drawLocations(locations));
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onLayerCreated(layerType: LayerType): void {
        this.hideRoute();
        this.hideLocation();

        for (var route of this.routes)
            route[0].remove();

        for (var location of this.locations)
            location[0].remove();

        this.routes.clear();
        this.locations.clear();
    }

    onRouteClick(e: LeafletMouseEvent): void {
        this.hidePreview();
        this.showRoute(e.target as Marker);
    }

    onLocationClick(e: LeafletMouseEvent): void {
        this.showLocation(e.target as Marker);
    }

    onRouteHover(e: LeafletMouseEvent): void {
        this.showPreview(e.target as Marker);
    }

    onRouteLeaveHover(e: LeafletMouseEvent): void {
        this.hidePreview();
    }

    onCloseDetails(): void {
        this.hideRoute();
        this.hideLocation();
    }

    //==============================================================================
    // Private Methods
    //==============================================================================
    drawRoutes(routes: RouteDto[]): void {
        for (var route of routes) {
            var marker = new Marker([route.coordinates[0].latitude, route.coordinates[0].longitude]);
            marker.addTo(this.mapService.map);

            marker.setIcon(this.mapService.blueMarker);

            marker.on('click', (e: LeafletMouseEvent) => this.onRouteClick(e));
            marker.on('mouseover', (e: LeafletMouseEvent) => this.onRouteHover(e));
            marker.on('mouseout', (e: LeafletMouseEvent) => this.onRouteLeaveHover(e));

            this.routes.set(marker, route);
        }
    }

    drawLocations(locations: LocationDto[]): void {
        for (var location of locations) {
            var marker = new Marker([location.latitude, location.longitude]);
            marker.addTo(this.mapService.map);

            var icon = location.type === LocationType.Portage ? this.mapService.yellowMarker : this.mapService.orangeMarker;
            marker.setIcon(icon);

            marker.on('click', (e: LeafletMouseEvent) => this.onLocationClick(e));

            this.locations.set(marker, location);
        }
    }

    showRoute(marker: Marker): void {
        var isCurrentMarker = this.selectedRouteMarker === marker;

        this.hideRoute();
        this.hideLocation();

        if (isCurrentMarker)
            return;

        this.selectedRouteMarker = marker;

        var route = this.routes.get(marker);
        var coordinates = route.coordinates.map(c => new LatLng(c.latitude, c.longitude));

        var lineOptions = {
            color: 'blue',
            weight: 3,
            opacity: 0.75,
            smoothFactor: 1
        };

        this.selectedRouteLine = new Polyline(coordinates, lineOptions).addTo(this.mapService.map);

        this.selectedRouteMarker.setIcon(this.mapService.greenMarker);

        this.selectedRouteEndMarker = new Marker(coordinates[coordinates.length - 1]).addTo(this.mapService.map);
        this.selectedRouteEndMarker.setIcon(this.mapService.redMarker);

        this.selectedLayer = {
            type: 'Route',
            name: route.name,
            description: route.description,
            user: route.userName,
            distance: this.mapService.getDistance(coordinates),
            iconPath: 'assets/blue-marker.png'
        };
    }

    hideRoute(): void {
        if (!this.selectedRouteMarker)
            return;

        this.selectedRouteLine.remove();
        this.selectedRouteEndMarker.remove();
        this.selectedRouteMarker.setIcon(this.mapService.blueMarker);

        this.selectedRouteMarker = null;
        this.selectedRouteEndMarker = null;
        this.selectedRouteLine = null;
        this.selectedLayer = null;
    }

    showLocation(marker: Marker): void {
        var isCurrentMarker = this.selectedLocationMarker === marker;

        this.hideRoute();
        this.hideLocation();

        if (isCurrentMarker)
            return;

        this.selectedLocationMarker = marker;

        var location = this.locations.get(marker);

        this.selectedLayer = {
            type: location.type === LocationType.Portage ? 'Portage' : 'Campsite',
            name: location.name,
            description: location.description,
            user: location.userName,
            iconPath: location.type === LocationType.Portage ? 'assets/yellow-marker.png' : 'assets/orange-marker.png'
        };
    }

    hideLocation(): void {
        this.selectedLocationMarker = null;
        this.selectedLayer = null;
    }

    showPreview(marker: Marker): void {
        var route = this.routes.get(marker);
        var coordinates = route.coordinates.map(c => new LatLng(c.latitude, c.longitude));

        var lineOptions = {
            color: 'red',
            weight: 5,
            opacity: 0.75,
            smoothFactor: 1
        };

        this.previewLine = new Polyline(coordinates, lineOptions).addTo(this.mapService.map);
    }

    hidePreview(): void {
        if (!this.previewLine)
            return;

        this.previewLine.remove();
        this.previewLine = null;
    }
}
