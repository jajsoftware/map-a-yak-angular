import { Component, OnInit } from '@angular/core';
import { LayerType, LayerTypeDescription, MapService, ModalService, ModalType } from '@app/core';

@Component({
    selector: 'discard-modal',
    templateUrl: './discard.modal.html'
})
export class DiscardModal implements OnInit {

    //==============================================================================
    // Properties
    //==============================================================================
    public type: string;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly mapService: MapService;
    private readonly modalService: ModalService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(mapService: MapService, modalService: ModalService) {
        this.mapService = mapService;
        this.modalService = modalService;

        this.mapService.layerCreated.subscribe(layerType => this.onLayerCreated(layerType));
    }

    //==============================================================================
    // Overrides
    //==============================================================================
    ngOnInit(): void {
        this.modalService.add(ModalType.Discard, document.getElementById('discardModal'));
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onLayerCreated(layerType: LayerType): void {
        this.type = LayerTypeDescription.get(layerType);
    }

    onDiscard(): void {
        location.reload();
    }
}
