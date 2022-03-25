import { Component } from '@angular/core';
import { ModalType } from '../../enums/enums';
import { ModalService } from '../../services/modal.service';

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
