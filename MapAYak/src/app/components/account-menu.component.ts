import { Component } from '@angular/core';
import { AccountModalType, ModalType } from '../enums/enums';
import { AccountService } from '../services/account.service';
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

    //==============================================================================
    // Data Members
    //==============================================================================
    private modalService: ModalService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(accountService: AccountService, modalService: ModalService) {
        this.accountService = accountService;
        this.modalService = modalService;
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
}
