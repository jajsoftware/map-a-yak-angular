import { Component, OnInit } from '@angular/core';
import { UserLayerDto } from '../../dtos/data/user-layer.dto';
import { ModalType } from '../../enums/enums';
import { DataService } from '../../services/data.service';
import { MapService } from '../../services/map.service';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'user-layers-modal',
    templateUrl: './user-layers.modal.html'
})
export class UserLayersModal implements OnInit {

    //==============================================================================
    // Properties
    //==============================================================================
    public layers: UserLayerDto[];

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
    }

    //==============================================================================
    // Overrides
    //==============================================================================
    ngOnInit(): void {
        this.modalService.add(ModalType.UserLayers, document.getElementById('userLayersModal'));

        this.dataService.getUserLayers().subscribe(layers => this.layers = layers);
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onView(layer: UserLayerDto): void {
        this.modalService.close(ModalType.UserLayers);
        this.mapService.viewUserLayer(layer);
    }

    onEdit(layer: UserLayerDto): void {
        this.modalService.close(ModalType.UserLayers);
        this.mapService.editUserLayer(layer);
    }

    onDelete(layer: UserLayerDto): void {
        this.modalService.close(ModalType.UserLayers);
        this.modalService.open(ModalType.DeleteConfirmation);
        this.mapService.deleteUserLayer(layer);
    }
}
