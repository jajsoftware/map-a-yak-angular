import { AfterViewInit, Component } from '@angular/core';
import { Icon, Map, Marker, TileLayer } from 'leaflet';
import { EditMode } from '../models/enums';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

    private map: Map;
    private editMode: EditMode;
    private readonly defaultMarker: Icon;
    private readonly greenMarker: Icon;
    private readonly redMarker: Icon;
    private readonly yellowMarker: Icon;
    private readonly orangeMarker: Icon;

    constructor() {

        this.editMode = EditMode.View;

        this.defaultMarker = new Marker([0, 0]).getIcon() as Icon;

        this.greenMarker = new Icon({
            iconUrl: 'images/green-marker.png',
            shadowUrl: 'images/marker-shadow.png'
        });

        this.redMarker = new Icon({
            iconUrl: 'images/red-marker.png',
            shadowUrl: 'images/marker-shadow.png'
        });

        this.yellowMarker = new Icon({
            iconUrl: 'images/yellow-marker.png',
            shadowUrl: 'images/marker-shadow.png'
        });

        this.orangeMarker = new Icon({
            iconUrl: 'images/orange-marker.png',
            shadowUrl: 'images/marker-shadow.png'
        });
    }

    ngAfterViewInit(): void {

        this.initializeMap();
    }

    initializeMap(): void {

        this.map = new Map('map');

        var mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var mapOptions = {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        };

        var tileLayer = new TileLayer(mapUrl, mapOptions);
        tileLayer.addTo(this.map);

        this.map.setView([43.5, -84.5], 7); // Defaults to Michigan.
    }
}

//this.userId = window.sessionStorage.getItem("userId");
//this.currentCoordinates = JSON.parse(window.sessionStorage.getItem("currentCoordinates"));
//this.currentZoom = JSON.parse(window.sessionStorage.getItem("currentZoom"));
//ko.applyBindings(this.modalValues);
//window.onbeforeunload = this.onBeforeUnload;

//if (this.currentCoordinates && this.currentZoom)
//    this.map.setView(this.currentCoordinates, this.currentZoom);
//else

//this.editMode = window.sessionStorage.getItem("editMode") ?? "View";
//if (this.editMode === "View") {
//    document.getElementById("createLayerDiv").style.display = 'none';
//    L.DomUtil.removeClass(this.map._container, 'crosshair-cursor');
//}
//else {
//    document.getElementById("viewLayerDiv").style.display = 'none';
//    L.DomUtil.addClass(this.map._container, 'crosshair-cursor');

//    var userLayersButton = document.getElementById("userLayersButton");
//    if (userLayersButton)
//        userLayersButton.classList.add('disabled');
//}

//private layer;
