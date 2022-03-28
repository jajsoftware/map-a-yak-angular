import { Component, OnInit } from '@angular/core';
import { AccountService, DataService, MapService, ModalService, ModalType, UserLayerDto } from '@app/core';

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
    private readonly accountService: AccountService;
    private readonly modalService: ModalService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(mapService: MapService, dataService: DataService, accountService: AccountService, modalService: ModalService) {
        this.mapService = mapService;
        this.dataService = dataService;
        this.accountService = accountService;
        this.modalService = modalService;

        this.accountService.userSignedIn.subscribe(() => this.loadData());
    }

    //==============================================================================
    // Overrides
    //==============================================================================
    ngOnInit(): void {
        this.modalService.add(ModalType.UserLayers, document.getElementById('userLayersModal'));

        if (this.accountService.userName)
            this.loadData();
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

    //==============================================================================
    // Private Methods
    //==============================================================================
    loadData(): void {
        this.dataService.getUserLayers().subscribe(layers => this.layers = layers);
    }
}
