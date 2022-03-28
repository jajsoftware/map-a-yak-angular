import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountModalType, AccountService, ModalService, ModalType } from '@app/core';

@Component({
    selector: 'register-component',
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    //==============================================================================
    // Properties
    //==============================================================================
    public email: FormControl;
    public userName: FormControl;
    public password: FormControl;
    public confirmPassword: FormControl;
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
        this.userName = new FormControl('', Validators.required);
        this.password = new FormControl('', Validators.required);
        this.confirmPassword = new FormControl('', Validators.required);

        this.modalService.accountModalTypeUpdated.subscribe(type => this.onAccountModalTypeUpdated(type));
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onAccountModalTypeUpdated(type: AccountModalType) {
        if (type !== AccountModalType.Register)
            return;

        this.email.reset('');
        this.userName.reset('');
        this.password.reset('');
        this.confirmPassword.reset('');
        this.error = null;
    }

    onRegister(): void {
        this.email.markAsTouched();
        this.userName.markAsTouched();
        this.password.markAsTouched();
        this.confirmPassword.markAsTouched();

        if (!this.email.valid || !this.userName.valid || !this.password.valid || !this.confirmPassword.valid)
            return;

        this.accountService.register(this.email.value, this.userName.value, this.password.value, this.confirmPassword.value).subscribe(
            success => this.modalService.updateAccountModalType(AccountModalType.EmailConfirmationSent),
            error => this.error = error.error);
    }

    onSignIn(): void {
        this.modalService.updateAccountModalType(AccountModalType.SignIn);
    }

    onCancel(): void {
        this.modalService.close(ModalType.Account);
    }
}
