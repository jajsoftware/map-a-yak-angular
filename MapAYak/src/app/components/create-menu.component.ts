import { Component } from '@angular/core';
import { AccountModalType, LayerType, ModalType } from '../models/enums';
import { AccountService } from '../services/account.service';
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
    private accountService: AccountService;
    private modalService: ModalService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(mapService: MapService, accountService: AccountService, modalService: ModalService) {
        this.mapService = mapService;
        this.accountService = accountService;
        this.modalService = modalService;

        this.mapService.layerCreated.subscribe(layerType => this.layerCreated = true);
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onSave(): void {
        if (!this.accountService.userName) {
            this.accountService.updateAccountModalType(AccountModalType.SignIn);
            this.modalService.open(ModalType.Account);
            return;
        }

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
