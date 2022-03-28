import { Component, OnInit } from '@angular/core';
import { DataService, LayerTypeDescription, MapService, ModalService, ModalType, UserLayerDto } from '@app/core';

@Component({
    selector: 'delete-confirmation-modal',
    templateUrl: './delete-confirmation.modal.html'
})
export class DeleteConfirmationModal implements OnInit {

    //==============================================================================
    // Properties
    //==============================================================================
    public layer: UserLayerDto;
    public type: string;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly mapService: MapService;
    private readonly dataService: DataService;
    private readonly modalService: ModalService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(mapService: MapService, dataService: DataService, modalService: ModalService) {
        this.mapService = mapService;
        this.dataService = dataService;
        this.modalService = modalService;

        this.mapService.userLayerDeleted.subscribe(layer => this.onDeleteUserLayer(layer));
    }

    //==============================================================================
    // Overrides
    //==============================================================================
    ngOnInit(): void {
        this.modalService.add(ModalType.DeleteConfirmation, document.getElementById('deleteConfirmationModal'));
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onDeleteUserLayer(layer: UserLayerDto): void {
        this.layer = layer;
        this.type = LayerTypeDescription.get(layer.type);
    }

    onDelete(): void {
        this.dataService.delete(this.layer.type, this.layer.name).subscribe(
            success => location.reload());
    }
}
