import { Component } from '@angular/core';
import { ModalService, ModalType } from '@app/core';

@Component({
    selector: 'email-confirmation-sent-component',
    templateUrl: './email-confirmation-sent.component.html'
})
export class EmailConfirmationSentComponent {

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
