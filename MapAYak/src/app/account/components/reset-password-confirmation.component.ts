import { Component } from '@angular/core';
import { AccountModalType, ModalService } from '@app/core';

@Component({
    selector: 'reset-password-confirmation-component',
    templateUrl: './reset-password-confirmation.component.html'
})
export class ResetPasswordConfirmationComponent {

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
    onSignIn(): void {
        this.modalService.updateAccountModalType(AccountModalType.SignIn);
    }
}
