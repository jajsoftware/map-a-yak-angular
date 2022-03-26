import { Component } from '@angular/core';
import { AccountModalType, ModalType } from '../enums/enums';
import { AccountService } from '../services/account.service';
import { MapService } from '../services/map.service';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'account-menu-component',
    templateUrl: './account-menu.component.html'
})
export class AccountMenuComponent {

    //==============================================================================
    // Properties
    //==============================================================================
    public accountService: AccountService;
    public layerCreated: boolean;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly mapService: MapService;
    private readonly modalService: ModalService;

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
    onSignIn(): void {
        this.accountService.updateAccountModalType(AccountModalType.SignIn);
        this.modalService.open(ModalType.Account);
    }

    onSignOut(): void {
        this.accountService.signOut().subscribe();
    }

    onUserLayers(): void {
        this.modalService.open(ModalType.UserLayers);
    }
}
