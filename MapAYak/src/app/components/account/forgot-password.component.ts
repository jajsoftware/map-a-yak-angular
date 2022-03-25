import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountModalType, ModalType } from '../../enums/enums';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'forgot-password-component',
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

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
        if (type !== AccountModalType.ForgotPassword)
            return;

        this.email.reset('');
        this.error = null;
    }

    onResetPassword(): void {
        this.email.markAsTouched();

        if (!this.email.valid)
            return;

        this.accountService.forgotPassword(this.email.value).subscribe(
            success => this.accountService.updateAccountModalType(AccountModalType.PasswordResetSent),
            error => this.error = error.error);
    }

    onCancel(): void {
        this.modalService.close(ModalType.Account);
    }
}
