import { Component, OnInit } from '@angular/core';
import { AccountModalType, ModalService, ModalType } from '@app/core';

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
    private readonly modalService: ModalService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(modalService: ModalService) {
        this.modalService = modalService;

        this.modalService.accountModalTypeUpdated.subscribe(type => this.type = type);
    }

    //==============================================================================
    // Overrides
    //==============================================================================
    ngOnInit(): void {
        this.modalService.add(ModalType.Account, document.getElementById('accountModal'));
    }
}
