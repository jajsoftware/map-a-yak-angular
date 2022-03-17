import { Component } from '@angular/core';
import { LayerType, ModalType } from '../models/enums';
import { MapService } from '../services/map.service';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'create-menu-component',
    templateUrl: './create-menu.component.html'
})
export class CreateMenuComponent {

    //==============================================================================
    // Properties
    //==============================================================================
    public layerCreated: boolean;

    //==============================================================================
    // Data Members
    //==============================================================================
    private mapService: MapService;
    private modalService: ModalService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(mapService: MapService, modalService: ModalService) {
        this.mapService = mapService;
        this.modalService = modalService;

        this.mapService.layerCreated.subscribe(layerType => this.layerCreated = true);
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onSave(): void {
        //if(notSignedIn)
        //signIn;

        this.modalService.open(ModalType.Save);
    }

    onDiscard(): void {
        if (this.mapService.coordinates.length === 0 && this.mapService.location == null) {
            location.reload();
            return;
        }

        this.modalService.open(ModalType.Discard);
    }

    onCreateRoute(): void {
        this.mapService.createLayer(LayerType.Route);
    }

    onCreatePortage(): void {
        this.mapService.createLayer(LayerType.Portage);
    }

    onCreateCampsite(): void {
        this.mapService.createLayer(LayerType.Campsite);
    }
}
