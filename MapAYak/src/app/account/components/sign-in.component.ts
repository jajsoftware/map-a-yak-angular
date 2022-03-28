import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountModalType, AccountService, ModalService, ModalType } from '@app/core';

@Component({
    selector: 'sign-in-component',
    templateUrl: './sign-in.component.html'
})
export class SignInComponent {

    //==============================================================================
    // Properties
    //==============================================================================
    public email: FormControl;
    public password: FormControl;
    public rememberPassword: FormControl;
    public error: string;
    public emailConfirmed: boolean;

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
        this.password = new FormControl('', Validators.required);
        this.rememberPassword = new FormControl(false);
        this.emailConfirmed = true;

        this.modalService.accountModalTypeUpdated.subscribe(type => this.onAccountModalTypeUpdated(type));
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onAccountModalTypeUpdated(type: AccountModalType) {
        if (type !== AccountModalType.SignIn)
            return;

        this.email.reset('');
        this.password.reset('');
        this.rememberPassword.reset(false);
        this.error = null;
        this.emailConfirmed = true;
    }

    onSignIn(): void {
        this.email.markAsTouched();
        this.password.markAsTouched();

        if (!this.email.valid || !this.password.valid)
            return;

        this.error = null;
        this.emailConfirmed = true;

        this.accountService.signIn(this.email.value, this.password.value, this.rememberPassword.value).subscribe(
            success => this.modalService.close(ModalType.Account),
            error => {
                if (error.error === 'Email not confirmed.')
                    this.emailConfirmed = false;
                else
                    this.error = error.error;
            });
    }

    onRegister(): void {
        this.modalService.updateAccountModalType(AccountModalType.Register);
    }

    onForgotPassword(): void {
        this.modalService.updateAccountModalType(AccountModalType.ForgotPassword);
    }

    onResendEmailConfirmation(): void {
        this.modalService.updateAccountModalType(AccountModalType.ResendEmailConfirmation);
    }

    onCancel(): void {
        this.modalService.close(ModalType.Account);
    }
}
