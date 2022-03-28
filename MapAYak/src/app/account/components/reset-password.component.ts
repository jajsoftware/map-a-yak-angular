import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DefaultUrlSerializer, Event as NavigationEvent, NavigationStart, Router } from '@angular/router';
import { AccountModalType, AccountService, ModalService, ModalType } from '@app/core';

@Component({
    selector: 'reset-password-component',
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

    //==============================================================================
    // Properties
    //==============================================================================
    public email: FormControl;
    public password: FormControl;
    public confirmPassword: FormControl;
    public error: string;

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly router: Router;
    private readonly accountService: AccountService;
    private readonly modalService: ModalService;
    private token: string;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(router: Router, accountService: AccountService, modalService: ModalService) {
        this.router = router;
        this.accountService = accountService;
        this.modalService = modalService;

        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', Validators.required);
        this.confirmPassword = new FormControl('', Validators.required);

        this.modalService.accountModalTypeUpdated.subscribe(type => this.onAccountModalTypeUpdated(type));
        this.router.events.subscribe(event => this.onNewRoute(event));
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onAccountModalTypeUpdated(type: AccountModalType) {
        if (type !== AccountModalType.ResetPassword)
            return;

        this.email.reset('');
        this.password.reset('');
        this.confirmPassword.reset('');
        this.error = null;
    }

    onNewRoute(route: NavigationEvent): void {
        if (!(route instanceof NavigationStart))
            return;

        var url = route.url.toLowerCase().split('?')[0];
        if (url !== '/account/resetpassword')
            return;

        this.router.navigate([]);
        this.modalService.updateAccountModalType(AccountModalType.ResetPassword);
        this.modalService.open(ModalType.Account);

        var parser = new DefaultUrlSerializer();
        var parsedUrl = parser.parse(route.url);

        this.token = parsedUrl.queryParamMap.get('token');
        if (!this.token)
            this.error = 'Invalid link.';
    }

    onReset(): void {
        if (!this.token)
            return;

        this.email.markAsTouched();
        this.password.markAsTouched();
        this.confirmPassword.markAsTouched();

        if (!this.email.valid || !this.password.valid || !this.confirmPassword.valid)
            return;

        this.accountService.resetPassword(this.email.value, this.password.value, this.confirmPassword.value, this.token).subscribe(
            success => this.modalService.updateAccountModalType(AccountModalType.ResetPasswordConfirmation),
            error => this.error = error.error);
    }

    onCancel(): void {
        this.modalService.close(ModalType.Account);
    }
}
