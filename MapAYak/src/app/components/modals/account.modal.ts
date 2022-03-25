import { Component, OnInit } from '@angular/core';
import { AccountModalType, ModalType } from '../../enums/enums';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'account-modal',
    templateUrl: './account.modal.html'
})
export class AccountModal implements OnInit {

    //==============================================================================
    // Exposed Enums
    //==============================================================================
    public AccountModalType: typeof AccountModalType = AccountModalType;

    //==============================================================================
    // Properties
    //==============================================================================
    public type: AccountModalType;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly accountService: AccountService;
    private readonly modalService: ModalService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(accountService: AccountService, modalService: ModalService) {
        this.accountService = accountService;
        this.modalService = modalService;

        this.accountService.accountModalTypeUpdated.subscribe(type => this.type = type);
    }

    //==============================================================================
    // Overrides
    //==============================================================================
    ngOnInit(): void {
        this.modalService.add(ModalType.Account, document.getElementById('accountModal'));
    }
}
