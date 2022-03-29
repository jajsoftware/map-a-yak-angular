import { AfterViewInit, Component } from '@angular/core';
import { MapService } from '@app/core';
import { DomUtil, Icon, Map, TileLayer } from 'leaflet';

@Component({
    selector: 'map-component',
    templateUrl: './map.component.html'
})
export class MapComponent implements AfterViewInit {

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly mapService: MapService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(mapService: MapService) {
        this.mapService = mapService;

        this.mapService.layerCreated.subscribe(layerType => this.onLayerCreated());
    }

    //==============================================================================
    // Overrides
    //==============================================================================
    ngAfterViewInit(): void {
        this.initializeMap();
        this.initializeMarkers();
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onLayerCreated(): void {
        DomUtil.addClass(this.mapService.map.getContainer(), 'crosshair-cursor');
    }

    //==============================================================================
    // Private Methods
    //==============================================================================
    initializeMap(): void {
        this.mapService.map = new Map('map');

        var mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var mapOptions = {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        };

        var tileLayer = new TileLayer(mapUrl, mapOptions);
        tileLayer.addTo(this.mapService.map);

        this.mapService.map.setView([44.25, -84.5], 7); // Defaults to Michigan.
    }

    initializeMarkers(): void {
        this.mapService.blueMarker = new Icon({
            iconUrl: 'assets/blue-marker.png',
            shadowUrl: 'assets/marker-shadow.png'
        });

        this.mapService.greenMarker = new Icon({
            iconUrl: 'assets/green-marker.png',
            shadowUrl: 'assets/marker-shadow.png'
        });

        this.mapService.redMarker = new Icon({
            iconUrl: 'assets/red-marker.png',
            shadowUrl: 'assets/marker-shadow.png'
        });

        this.mapService.yellowMarker = new Icon({
            iconUrl: 'assets/yellow-marker.png',
            shadowUrl: 'assets/marker-shadow.png'
        });

        this.mapService.orangeMarker = new Icon({
            iconUrl: 'assets/orange-marker.png',
            shadowUrl: 'assets/marker-shadow.png'
        });
    }
}
