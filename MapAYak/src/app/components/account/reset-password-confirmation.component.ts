import { Component } from '@angular/core';
import { AccountModalType } from '../../models/enums';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'reset-password-confirmation-component',
    templateUrl: './reset-password-confirmation.component.html'
})
export class ResetPasswordConfirmationComponent {

    //==============================================================================
    // Data Members
    //==============================================================================
    private readonly accountService: AccountService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(accountService: AccountService) {
        this.accountService = accountService;
    }

    //==============================================================================
    // Event Handlers
    //==============================================================================
    onSignIn(): void {
        this.accountService.updateAccountModalType(AccountModalType.SignIn);
    }
}
