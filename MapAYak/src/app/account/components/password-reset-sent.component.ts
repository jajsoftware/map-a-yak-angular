import { Component } from '@angular/core';
import { ModalService, ModalType } from '@app/core';

@Component({
    selector: 'password-reset-sent-component',
    templateUrl: './password-reset-sent.component.html'
})
export class PasswordResetSentComponent {

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly modalService: ModalService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(modalService: ModalService) {
        this.modalService = modalService;
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onReturnHome(): void {
        this.modalService.close(ModalType.Account);
    }
}
