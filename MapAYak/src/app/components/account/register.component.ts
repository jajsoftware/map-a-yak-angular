import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountModalType, ModalType } from '../../models/enums';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';

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

        this.accountService.accountModalTypeUpdated.subscribe(type => this.onAccountModalTypeUpdated(type));
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
            success => this.accountService.updateAccountModalType(AccountModalType.EmailConfirmationSent),
            error => this.error = error.error);
    }

    onSignIn(): void {
        this.accountService.updateAccountModalType(AccountModalType.SignIn);
    }

    onCancel(): void {
        this.modalService.close(ModalType.Account);
    }
}
