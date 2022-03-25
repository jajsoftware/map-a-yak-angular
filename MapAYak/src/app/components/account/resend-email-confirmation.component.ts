import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountModalType, ModalType } from '../../enums/enums';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'resend-email-confirmation-component',
    templateUrl: './resend-email-confirmation.component.html'
})
export class ResendEmailConfirmationComponent {

    //==============================================================================
    // Properties
    //==============================================================================
    public email: FormControl;
    public error: string;

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

        this.email = new FormControl('', [Validators.required, Validators.email]);

        this.accountService.accountModalTypeUpdated.subscribe(type => this.onAccountModalTypeUpdated(type));
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onAccountModalTypeUpdated(type: AccountModalType) {
        if (type !== AccountModalType.ResendEmailConfirmation)
            return;

        this.email.reset('');
        this.error = null;
    }

    onResend(): void {
        this.email.markAsTouched();

        if (!this.email.valid)
            return;

        this.accountService.resendEmailConfirmation(this.email.value).subscribe(
            success => this.accountService.updateAccountModalType(AccountModalType.EmailConfirmationSent),
            error => this.error = error.error);
    }

    onCancel(): void {
        this.modalService.close(ModalType.Account);
    }
}
