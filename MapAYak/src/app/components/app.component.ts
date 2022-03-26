import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    //==============================================================================
    // Properties
    //==============================================================================
    public readonly accountService: AccountService;

    //==============================================================================
    // Constructor
    //==============================================================================
    constructor(accountService: AccountService) {
        this.accountService = accountService;
    }
}
